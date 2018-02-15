// this is login ids, names of id
var ids = [
  'username',
  'login_id',
  'log',
];

// this is login ids, names of pw
var pws = [
  'password',
  'pwd',
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
    var submit = null;
    var types = ['input', 'button'];

    for (var t = 0; t < types.length; t++) {
      var length = document.getElementsByTagName(types[t]).length;
      length = length <= 10 ? length : 10;
      for (var i = 0; i < length; i++) {
        if (document.getElementsByTagName(types[t])[i].type === "submit") {
          submit = document.getElementsByTagName(types[t])[i];
          break;
        }
      }

      if (submit) {
        break;
      }
    }

    if (submit) {
      for (var i = 0; i < buttons.length; i++) {
        if (submit.innerHTML.indexOf(buttons[i]) !== -1) {
          submit.click();
          break;
        } else if (submit.value.indexOf(buttons[i]) !== -1) {
          submit.click();
          break;
        }
      }
    }
}

function undefined2Defulat(value, defualt) {
  return value !== undefined ? value : defualt;
}

chrome.runtime.sendMessage({fn: "getConfig"}, function(response) {
  var completeList = response.completeList;
  var matchFlg = false;
  chrome.storage.sync.get(function (data) {
    for (var i = 0; i < completeList.length; i++) {
      var item = completeList[i];

      if (item.url.indexOf(`${window.location.hostname}:${window.location.port}`) !== -1) {
        matchFlg = true;
      } else if ((window.location.port  === '') && item.url.indexOf(`${window.location.hostname}`) !== -1) {
        matchFlg = true;
      }

      if (matchFlg) {
        var id = undefined2Defulat(data[`${item.uid}_id`], '');
        var pw = undefined2Defulat(data[`${item.uid}_pw`], '');
        var auto = undefined2Defulat(data[`${item.uid}_auto`], false);

        findInput(ids, id);
        findInput(pws, pw);

        if(auto){
          autoLogin();
        }
        break;
      }
    }
  });
});
