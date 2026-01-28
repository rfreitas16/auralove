const timeline = document.getElementById('timeline');
const form = document.getElementById('timelineForm');

let events = [];

// 🔹 Buscar eventos do backend
async function loadEvents() {
  const res = await fetch('/events');
  events = await res.json();
  renderTimeline();
}

function renderTimeline() {
  timeline.innerHTML = '';

  events.forEach((event, index) => {
    const item = document.createElement('div');
    item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

    item.innerHTML = `
      <div class="timeline-content">
        <h3>${event.title}</h3>
        <small>${event.date}</small>
        <p>${event.description}</p>
      </div>
      <span class="timeline-dot"></span>
    `;

    timeline.appendChild(item);
  });

  animateOnScroll();
}

// ➕ Enviar novo evento
form.addEventListener('submit', async e => {
  e.preventDefault();

  const newEvent = {
    title: title.value,
    date: date.value,
    description: description.value,
  };

  await fetch('/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent),
  });

  form.reset();
  loadEvents();
});

// 🎞️ Animação no scroll
function animateOnScroll() {
  const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.2 },
  );

  items.forEach(item => observer.observe(item));
}

loadEvents();

//// Atualizar o front end com back end
function renderTimeline() {
  timeline.innerHTML = '';

  events.forEach((event, index) => {
    const item = document.createElement('div');
    item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;

    item.innerHTML = `
      <div class="timeline-content">
        <h3>${event.title}</h3>
        <small>${event.date}</small>
        <p>${event.description}</p>

        <div class="actions">
          <button onclick="likeEvent(${index})">
            ❤️ ${event.likes}
          </button>

          <button onclick="favoriteEvent(${index})">
            ${event.favorite ? '⭐ Favoritado' : '☆ Favoritar'}
          </button>
        </div>
      </div>
      <span class="timeline-dot"></span>
    `;

    timeline.appendChild(item);
  });

  animateOnScroll();
}
// adicionar funcoes de acao

async function likeEvent(index) {
  await fetch(`/events/${index}/like`, { method: 'POST' });
  loadEvents();
}

async function favoriteEvent(index) {
  await fetch(`/events/${index}/favorite`, { method: 'POST' });
  loadEvents();
}
