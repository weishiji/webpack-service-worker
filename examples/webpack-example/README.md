# [Material-UI Docs](http://callemall.github.io/material-ui/)

This is the documentation website and application of Material-UI.

## Requirements

- [Node](https://nodejs.org) 4.0 or newer
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Xcode](https://developer.apple.com/xcode/) for iOS development (optional)
- [Android SDK](https://developer.android.com/sdk/) for Android development (optional)

## Installation
After cloning the repository, install dependencies:
```sh
cd <project folder>/material-ui
npm install
cd <project folder>/material-ui/docs
npm install
```

## Running

Once dependencies are installed, start the application with:

### Browser

```sh
npm run browser:development
```

Open `http://localhost:3000` to view the documentation site.

### iOS

```sh
npm run native:development
```

Open `ios/iosApp.xcodeproj` in Xcode, build and run the project.

### Android

```sh
npm run native:development
npm run android:setup-port
react-native run-android
```
### 下面是我关于PWA的文档说明
- [homescreen] 尼玛，太简单，直接贴代码,就是在网站的根目录下放一个```manifest.json```文件吧啦吧啊写点配置
```json
{
	"name": "Preact PWA",
	"short_name": "Preact PWA",
	"start_url": "/",
	"background_color": "#f1f1f1",
	"theme_color": "#673ab8",
	"display": "standalone",
	"orientation": "portrait",
	"icons": [{
	    "src": "/icons/icon-192x192.png",
	    "type": "image/png",
	    "sizes": "192x192"
	  },
		{
	    "src": "/icons/icon-512x512.png",
	    "type": "image/png",
	    "sizes": "512x512"
	  }]
		,"gcm_sender_id": "270438610515"
		
}
```
- [离线缓存] 尼玛，太简单，直接贴代码,基于**webpack**写的，所以也没啥好说的
- [自动登陆] 尼玛，还是有些简单，略过。

- [通知机制] 尼玛，有点复杂哦。开始讲解这的代码吧
1、首先我们需要一个舶来的函数将一个public key 进行加密
```javascript
function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
//首先注册一个service worker ，需要通过webpack自动生成一个吧，会省好多事儿 
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/my-service-worker.js');
}
	
//下一步进行订阅
var applicationServerPublicKey = 'BMviQJTbejhRy3tiRklX_oyK_SImv1G2MtuevA16iOJQaUQLegT64f7ZGILdHZx78QMMA6C9HiNt3hAGM_89zpw'
		var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			serviceWorkerRegistration.pushManager.subscribe({
				userVisibleOnly: true
				,applicationServerKey: applicationServerKey
			})
				.then(function(subscription) {
					// The subscription was successful
					isPushEnabled = true;
					pushButton.textContent = 'Disable Push Messages';
					pushButton.disabled = false;

					// TODO: Send the subscription.endpoint to your server
					// and save it to send a push message at a later date
					var endpoint = subscription.endpoint;
					var key = subscription.getKey('p256dh');
					var auth = subscription.getKey('auth');
					console.log(subscription.toJSON())
					console.log(JSON.stringify(subscription))
					console.log(endpoint)
					console.log(key)
					console.log(auth)
					document.body.innerHTML = JSON.stringify(subscription);
          //TODO:关键点是将这个endpoint 的所有数据传递给你的server 段进行保存
					return sendSubscriptionToServer(subscription);
				})
				.catch(function(e) {
					if (Notification.permission === 'denied') {
						// The user denied the notification permission which
						// means we failed to subscribe and the user will need
						// to manually change the notification permission to
						// subscribe to push messages
						console.warn('Permission for Notifications was denied');
						pushButton.disabled = true;
					} else {
						// A problem occurred with the subscription; common reasons
						// include network errors, and lacking gcm_sender_id and/or
						// gcm_user_visible_only in the manifest.
						console.error('Unable to subscribe to push.', e);
						pushButton.disabled = false;
						pushButton.textContent = 'Enable Push Messages';
					}
				});
		});

```



```
```
