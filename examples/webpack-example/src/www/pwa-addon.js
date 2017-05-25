// Push notifications
console.log('hello world this is ++++++++')
self.addEventListener('push', function(event) {
    console.log(event.data.text(),'-------------+++++')
	var title = 'jfn';
	var body = event.data.text() + '****';
	var icon = '/images/icon-192x192.png';
	var tag = 'simple-push-demo-notification-tag';

	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag
		})
	);
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const url = './latest.html?notification=true';
    event.waitUntil(
        clients.matchAll({ type: 'window'}).then(function (windowClients) {
            for (let i = 0; i < windowClients.length; i++) {
                const client = windowClients[i];
                if (client.url === url && 'focus' in client) return client.focus()
            }
            if (clients.openWindow) return clients.openWindow(url)
        })
    );
});