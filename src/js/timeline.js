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
    <span class="like"><i class="fa-regular fa-heart"></i></span>
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

  <span class="timeline-dot"></span>
`;

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
