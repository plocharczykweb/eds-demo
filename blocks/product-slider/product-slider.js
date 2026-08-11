export default function decorate(block) {
  const rows = [...block.children];

  const headingRow = rows[0];
  const desktopImageRow = rows[1];
  const mobileImageRow = rows[2];
  const labelRow = rows[3];

  if (!headingRow || !desktopImageRow || !labelRow) return;

  const heading = headingRow.textContent.trim();

  const desktopImages = [...desktopImageRow.children].map(
    (cell) => cell.textContent.trim(),
  );

  const mobileImages = mobileImageRow
    ? [...mobileImageRow.children].map(
      (cell) => cell.textContent.trim(),
    )
    : [];

  const labels = [...labelRow.children].map(
    (cell) => cell.textContent.trim(),
  );

  block.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = heading;

  const viewport = document.createElement('div');
  viewport.className = 'product-slider-viewport';

  const track = document.createElement('div');
  track.className = 'product-slider-track';

  desktopImages.forEach((desktopSrc, index) => {
    if (!desktopSrc) return;

    const mobileSrc = mobileImages[index] || desktopSrc;

    const item = document.createElement('div');
    item.className = 'product-slider-item';

    const picture = document.createElement('picture');

    if (mobileSrc) {
      const mobileSource = document.createElement('source');
      mobileSource.media = '(max-width: 900px)';
      mobileSource.srcset = mobileSrc;

      picture.append(mobileSource);
    }

    const img = document.createElement('img');
    img.src = desktopSrc;
    img.alt = labels[index] || '';
    img.loading = 'lazy';

    picture.append(img);

    const label = document.createElement('div');
    label.className = 'product-slider-label';
    label.textContent = labels[index] || '';

    item.append(picture, label);
    track.append(item);
  });

  const prev = document.createElement('button');
  prev.className = 'product-slider-arrow product-slider-prev';
  prev.type = 'button';
  prev.setAttribute('aria-label', 'Previous products');
  prev.innerHTML = '❮';

  const next = document.createElement('button');
  next.className = 'product-slider-arrow product-slider-next';
  next.type = 'button';
  next.setAttribute('aria-label', 'Next products');
  next.innerHTML = '❯';

  viewport.append(track, prev, next);
  block.append(title, viewport);

  function updateArrows() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    prev.hidden = track.scrollLeft <= 1;

    next.hidden =
      maxScrollLeft <= 1 ||
      track.scrollLeft >= maxScrollLeft - 1;
  }

  function scroll(direction) {
    const item = track.querySelector('.product-slider-item');

    if (!item) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = item.offsetWidth + gap;

    track.scrollBy({
      left: distance * direction,
      behavior: 'smooth',
    });
  }

  prev.addEventListener('click', () => {
    scroll(-1);
  });

  next.addEventListener('click', () => {
    scroll(1);
  });

  track.addEventListener('scroll', updateArrows);

  window.addEventListener('resize', updateArrows);

  track.querySelectorAll('img').forEach((img) => {
    if (!img.complete) {
      img.addEventListener('load', updateArrows);
    }
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(updateArrows);
  });
}
