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

  ${
    event.image
      ? `
    <div class="timeline-image">
      <img src="${event.image}" alt="${event.title}">
    </div>
  `
      : ''
  }
  ${
    event.music
      ? `
    <div class="timeline-music">
      <audio controls preload="none">
        <source src="${event.music}" type="audio/mpeg">
        Seu navegador não suporta áudio.
      </audio>
    </div>
  `
      : ''
  }

  <span class="timeline-dot"></span>
`;

      // faz comecar com 50% do volume
      const audios = item.querySelectorAll('audio');

      audios.forEach(audio => {
        audio.volume = 0.5; // 50% de volume
      });

      // clique para expandir
      item.querySelector('.timeline-content').addEventListener('click', () => {
        item.classList.toggle('active');
      });

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
