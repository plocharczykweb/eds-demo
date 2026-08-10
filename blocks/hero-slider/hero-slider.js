export default function decorate(block) {
  const rows = [...block.children];

  const imageRow = rows[0];
  const titleRow = rows[1];
  const descriptionRow = rows[2];
  const metaRow = rows[3];

  if (!imageRow || !titleRow) return;

  const images = [...imageRow.children].map((cell) => cell.textContent.trim());
  const titles = [...titleRow.children].map((cell) => cell.textContent.trim());
  const descriptions = descriptionRow
    ? [...descriptionRow.children].map((cell) => cell.textContent.trim())
    : [];
  const meta = metaRow
    ? [...metaRow.children].map((cell) => cell.textContent.trim())
    : [];

  block.innerHTML = '';

  const slider = document.createElement('div');
  slider.className = 'hero-slider-inner';

  const track = document.createElement('div');
  track.className = 'hero-slider-track';

  images.forEach((src, index) => {
    if (!src) return;

    const slide = document.createElement('div');
    slide.className = 'hero-slider-slide';

    const img = document.createElement('img');
    img.src = src;
    img.alt = titles[index] || '';
    img.loading = index === 0 ? 'eager' : 'lazy';

    const overlay = document.createElement('div');
    overlay.className = 'hero-slider-overlay';

    if (titles[index]) {
      const title = document.createElement('h2');
      title.textContent = titles[index];
      overlay.append(title);
    }

    if (descriptions[index]) {
      const description = document.createElement('p');
      description.className = 'hero-slider-description';
      description.textContent = descriptions[index];
      overlay.append(description);
    }

    if (meta[index]) {
      const metaText = document.createElement('p');
      metaText.className = 'hero-slider-meta';
      metaText.textContent = meta[index];
      overlay.append(metaText);
    }

    slide.append(img, overlay);
    track.append(slide);
  });

  const prev = document.createElement('button');
  prev.className = 'hero-slider-arrow hero-slider-prev';
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = '❮';

  const next = document.createElement('button');
  next.className = 'hero-slider-arrow hero-slider-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = '❯';

  const dots = document.createElement('div');
  dots.className = 'hero-slider-dots';

  const slides = [...track.children];

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'hero-slider-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);

    dot.addEventListener('click', () => {
      goToSlide(index);
    });

    dots.append(dot);
  });

  slider.append(track, prev, next, dots);
  block.append(slider);

  let currentIndex = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    [...dots.children].forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    prev.hidden = currentIndex === 0;
    next.hidden = currentIndex === slides.length - 1;
  }

  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, slides.length - 1));
    updateSlider();
  }

  prev.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
  });

  next.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
  });

  updateSlider();
}
