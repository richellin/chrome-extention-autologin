var background = {
  config: {},

  init: function() {
    this.loadConfig();

    // listen for any messages, and route them to fucntions
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if(request.fn in background) {
        background[request.fn](request, sender, sendResponse);
      }
    });
  },

  loadConfig: function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        background.config = JSON.parse(xhr.response);
      }
    };
    xhr.open("GET", chrome.runtime.getURL("/config.json"), true);
    xhr.send();
  },

  getConfig: function(request, sender, sendResponse) {
    sendResponse(background.config);
  }
};

// startup
background.init();
