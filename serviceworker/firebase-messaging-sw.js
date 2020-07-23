importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase.min.js'
)

const CONFIG = {
  apiKey: 'AIzaSyAJCF24yUduqXVDm6YiOwvzFRC0g5xhA0s',
  authDomain: 'think-piece-61461.firebaseapp.com',
  databaseURL: 'https://think-piece-61461.firebaseio.com',
  projectId: 'think-piece-61461',
  storageBucket: 'think-piece-61461.appspot.com',
  messagingSenderId: '384403560705',
  appId: '1:384403560705:web:4d9b60b5845112c5f9e300',
}

firebase.initializeApp(CONFIG)

const messaging = firebase.messaging()

// Customize notification handler
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message', payload)

  // Copy data object to get parameters in the click handler
  payload.data.data = JSON.parse(JSON.stringify(payload.data))

  return self.registration.showNotification(payload.data.title, payload.data)
})

self.addEventListener('notificationclick', function (event) {
  const target = event.notification.data.click_action || '/'
  event.notification.close()

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(handleClick)
})

function handleClick() {
  clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (clientList) {
      // clientList always is empty?!
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i]
        if (client.url === target && 'focus' in client) {
          return client.focus()
        }
      }

      return clients.openWindow(target)
    })
}
