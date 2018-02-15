// this is login ids, names of id
var ids = [
  'username',
  'login_id',
];

// this is login ids, names of pw
var pws = [
  'password',
];

// this is login ids, names of button
var buttons = [
  'ログイン',
  'login',
  '로그인',
];
var completeList = [];

function findID(id) {
  return document.getElementById(id);
}

function findName(name) {
  return document.getElementsByName(name)[0];
}

function findInput(ids, value) {
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    if(findID(id)) {
      document.getElementById(id).value = value;
    } else if(findName(id)) {
      document.getElementsByName(id)[0].value = value;
    }
  }
}

function adminLogin(username, password, auto) {
  $('username').value = username;
  $('password').value = password;

  if (auto) {
    var button = document.getElementsByTagName('button')[0];
    button.click();
  }
}

function autoLogin() {
    var button;
    if (document.getElementsByTagName('button')[0].type === "submit") {
      submit = document.getElementsByTagName('button')[0];
    } else if (document.getElementsByTagName('input')[0].type === "submit") {
      submit = document.getElementsByTagName('input')[0];
    }

    if (submit) {
      for (var i = 0; i < buttons.length; i++) {
        if (submit.innerHTML.indexOf(buttons[i]) !== -1) {
          submit.click();
        }
      }
    }
}

function undefined2Defulat(value, defualt) {
  return value !== undefined ? value : defualt;
}

chrome.runtime.sendMessage({fn: "getConfig"}, function(response) {
  var config = response;
  var completeList = config.completeList;
  var matchFlg = false;
  chrome.storage.sync.get(function (data) {
    for (var i = 0; i < completeList.length; i++) {
      var item = completeList[i];

      if (item.url.indexOf(`${window.location.hostname}:${window.location.port}`) !== -1) {
        matchFlg = true;
      } else if ((window.location.port  === 80 || window.location.port  === 443) && item.url.indexOf(`${window.location.hostname}`) !== -1) {
        matchFlg = true;
      }

      if (matchFlg) {
        var id = undefined2Defulat(data[`${item.uid}_id`], '');
        var pw = undefined2Defulat(data[`${item.uid}_pw`], '');
        var auto = undefined2Defulat(data[`${item.uid}_auto`], false);

        findInput(ids, id);
        findInput(pws, pw);

        if(auto) {
          autoLogin();
        }
        break;
      }
    }
  });
});
