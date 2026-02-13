const heartsContainer = document.getElementById('hearts-container');

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    createHearts(3); // quantidade por scroll
  }

  lastScroll = currentScroll;
});

function createHearts(amount) {
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤';

    const size = Math.random() * 20 + 10;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = size + 'px';
    heart.style.animationDuration = (Math.random() * 2 + 2) + 's';

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 4000);
  }
}