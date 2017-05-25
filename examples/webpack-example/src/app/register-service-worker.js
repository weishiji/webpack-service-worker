/**
 * Created by lxg on 23/05/2017.
 */
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

var registerServiceWorker = function(){
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/my-service-worker.js');
	}
	//TODO:自己实现push的方式

	var isPushEnabled = false;

	function subscribe() {
		// Disable the button so it can't be changed while
		// we process the permission request
		var pushButton = document.querySelector('.notification-btn');
		console.log(pushButton,'this is button')
		pushButton.disabled = true;
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
	}


	window.addEventListener('load', function() {
		var pushButton = document.querySelector('.notification-btn');
		console.log(pushButton,'this is button')
		pushButton.addEventListener('click', function() {
			if (isPushEnabled) {
				unsubscribe();
			} else {
				subscribe();
			}
		});
	});

	// Once the service worker is registered set the initial state
	function initialiseState() {
		// Are Notifications supported in the service worker?
		if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
			console.warn('Notifications aren\'t supported.');
			return;
		}

		// Check the current Notification permission.
		// If its denied, it's a permanent block until the
		// user changes the permission
		if (Notification.permission === 'denied') {
			console.warn('The user has blocked notifications.');
			return;
		}

		// Check if push messaging is supported
		if (!('PushManager' in window)) {
			console.warn('Push messaging isn\'t supported.');
			return;
		}

		// We need the service worker registration to check for a subscription
		navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
			// Do we already have a push message subscription?
			serviceWorkerRegistration.pushManager.getSubscription()
				.then(function(subscription) {
					// Enable any UI which subscribes / unsubscribes from
					// push messages.
					var pushButton = document.querySelector('.notification-btn');
					pushButton.disabled = false;

					if (!subscription) {
						// We aren't subscribed to push, so set UI
						// to allow the user to enable push
						return;
					}

					// Keep your server in sync with the latest subscriptionId
					sendSubscriptionToServer(subscription);

					// Set your UI to show they have subscribed for
					// push messages
					pushButton.textContent = 'Disable Push Messages';
					isPushEnabled = true;
				})
				.catch(function(err) {
					console.warn('Error during getSubscription()', err);
				});
		});
	}


}




export default registerServiceWorker;
