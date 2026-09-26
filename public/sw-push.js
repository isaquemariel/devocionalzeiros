// Service Worker Push Event Handler
// This file is imported by the Workbox-generated service worker

// Só abre endereços do PRÓPRIO app: um link de fora no payload viraria um
// redirecionamento aberto a partir de uma notificação com a nossa marca.
function urlDoApp(bruta) {
  try {
    const u = new URL(bruta || '/devocional', self.location.origin);
    if (u.origin !== self.location.origin) return '/devocional';
    return u.pathname + u.search + u.hash;
  } catch (e) {
    return '/devocional';
  }
}

// Safari/iOS revoga a inscrição se um push chegar sem notificação na tela —
// lá ela aparece sempre, mesmo com o app aberto.
const SAFARI = /Safari/.test(self.navigator.userAgent) && !/Chrome|Chromium|Android/.test(self.navigator.userAgent);

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Devocionalzeiros', body: event.data.text() };
  }

  const url = urlDoApp(data.url);
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

  // Push só para quem está FORA do app: se há uma janela do app visível, a
  // notificação não vai para a bandeja — a mensagem vai para a página, e lá
  // quem avisa é o Devocionalzeiro. (O servidor já pula quem está presente;
  // isto cobre a janela entre um sinal de presença e outro.)
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((janelas) => {
      // "no app" = a janela com FOCO (uma janela visível mas atrás de outros
      // programas não conta: o aviso dentro dela ninguém veria)
      const naFrente = janelas.find((j) => j.focused) || null;
      if (naFrente && !SAFARI) {
        naFrente.postMessage({ tipo: 'push-no-app', origem: data.tipo || null, title: data.title, body: data.body, url });
        return;
      }
      return self.registration.showNotification(data.title || 'Devocionalzeiros 🙏', options);
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  const url = urlDoApp(event.notification.data && event.notification.data.url);
  const abrirNova = () => (clients.openWindow ? clients.openWindow(url) : undefined);

  // espera a navegação terminar (senão o worker pode ser encerrado antes); se a
  // janela não é controlada por este worker, `navigate` falha — abre outra
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      const janela = clientList.find((c) => new URL(c.url).origin === self.location.origin && 'focus' in c);
      if (!janela) return abrirNova();
      return janela.focus()
        .then((c) => (c && 'navigate' in c ? c.navigate(url) : abrirNova()))
        .catch(abrirNova);
    })
  );
});
