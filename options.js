var completeList = [];
var inputs = [
    {
      id: 'id',
      type: 'input',
      value: ''
    },
    {
      id: 'pw',
      type: 'input',
      value: ''
    },
    {
      id: 'auto',
      type: 'checkbox',
      value: false
    },
];

function $(id) {
  return document.getElementById(id);
}

function undefined2Defulat(value, defualt) {
  return value !== undefined ? value : defualt;
}

function onTextInput(event) {
  var id = event.target.id;
  var value = $(id).value;
  var data = {
    [id]: value
  };
  chrome.storage.sync.set(data);
}

function onCheckBoxInput(event) {
  var id = event.target.id;
  var value = $(id).checked;
  var data = {
    [id]: value
  };
  chrome.storage.sync.set(data);
}

function getStorageDatas() {
  chrome.storage.sync.get(function (data) {
    // get stoage
    for (var i = 0; i < completeList.length; i++){
      var item = completeList[i];
      for (var k = 0; k < inputs.length; k++) {
        var input = inputs[k];
        var id = item.uid + '_' + input.id;
        if (input.type == 'checkbox') {
          $(id).checked = undefined2Defulat(data[id], input.value);
        } else {
          $(id).value = undefined2Defulat(data[id], input.value);
        }
      }
    }
  });
}

function addEventListeners() {
  for (var i = 0; i < completeList.length; i++){
    var item = completeList[i];
    for (var k = 0; k < inputs.length; k++) {
      var input = inputs[k];
      var id = item.uid + '_' + input.id;
      if (input.type == 'checkbox') {
        $(id).addEventListener('change', onCheckBoxInput);
      } else {
        $(id).addEventListener('input', onTextInput);
      }
    }
  }
}

function createForm() {
  var form = '<table border="1">';

  if (completeList) {
    for (var i = 0; i < completeList.length; i++){
      var item = completeList[i];
      form += `
      <tr>
        <th rowspan="2">${item.name}</th>
        <td>ID</td>
        <td>
          <input id="${item.uid}_id" type="text" placeholder="Input ${item.name} ID" spellcheck="false">
        </td>
        <td rowspan="2">
          <label for="${item.uid}_auto">
            Auto <input id="${item.uid}_auto" type="checkbox" value=1>
          </label>
        </td>
      </tr>
      <tr>
          <td>PW</td>
          <td><input id="${item.uid}_pw" type="password" placeholder="Input ${item.name} PW"></td>
      </tr>
      `;
    }
  }
  form += '</table>';
  $('config').innerHTML = form;
}

// Initalize the options.
document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({fn: "getConfig"}, function(response) {
    completeList = response.completeList;
    createForm();

    // getStorage
    getStorageDatas();

    // addEventListeners
    addEventListeners();
  });
});
