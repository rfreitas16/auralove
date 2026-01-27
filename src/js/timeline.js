const timeline = document.getElementById('timeline');

fetch('data.json')
  .then(res => res.json())
  .then(events => {
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
  });

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
