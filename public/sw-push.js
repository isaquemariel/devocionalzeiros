// Service Worker Push Event Handler
// This file is imported by the Workbox-generated service worker

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Devocionalzeiros', body: event.data.text() };
  }

  const url = data.url || '/devocional';
  // As conquistas se agrupam numa notificação só (a mais nova substitui a
  // anterior e toca de novo), e o botão já diz o que fazer: resgatar.
  const conquista = url.indexOf('/conquistas') === 0;
  const options = {
    body: data.body || 'Você tem um novo devocional!',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [200, 100, 200],
    data: { url },
    tag: data.tag || (conquista ? 'conquistas' : undefined),
    renotify: conquista || undefined,
    actions: [
      { action: 'open', title: conquista ? 'Resgatar' : 'Abrir' },
      { action: 'close', title: 'Fechar' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Devocionalzeiros 🙏', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const url = event.notification.data?.url || '/devocional';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
