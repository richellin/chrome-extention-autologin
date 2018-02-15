# chrome-extension-autologin
this is extension that you can login automatically.
I was inspired by [app_launcher](http://developer.chrome.com/extensions/examples/extensions/app_launcher.zip)

# Use
```
# git clone
git clone https://github.com/richellin/chrome-extention-autologin.git

# set config.json
{
    "completeList": [
        {
            "uid": "uid",
            "name": "Name",
            "url": "https://xxx.xxx",
            "icon": {"url": "https://xxx.xxx/favicon.ico"}
        }
    ]
}
```

![](/doc/setting1.png)

![](/doc/setting2.png)

![](/doc/setting3.png)


Calls
-----

* [extension.getURL](https://developer.chrome.com/extensions/extension#method-getURL)
* [runtime.sendMessage](https://developer.chrome.com/apps/runtime#method-sendMessage)
* [management.getAll](https://developer.chrome.com/extensions/management#method-getAll)
* [management.launchApp](https://developer.chrome.com/extensions/management#method-launchApp)
* [tabs.create](https://developer.chrome.com/extensions/tabs#method-create)
* [storage.sync](https://developer.chrome.com/apps/storage#property-sync)
