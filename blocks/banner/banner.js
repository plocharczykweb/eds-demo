function slideBanner(block) {
  const container = block.querySelector(':scope > div');

  if (!container) return;

  function slide() {
    const banners = container.querySelectorAll(':scope > div');
    const firstBanner = banners[0];

    if (!firstBanner) return;

    // Animate first banner out to the left
    firstBanner.style.transition = 'margin-left 300ms ease';
    firstBanner.style.marginLeft = '-100%';

    setTimeout(() => {
      // Move it to the end
      container.appendChild(firstBanner);

      // Reset it without animating
      firstBanner.style.transition = 'none';
      firstBanner.style.marginLeft = '0';

      // Wait 2500ms before sliding again
      setTimeout(slide, 2500);
    }, 300);
  }

  setTimeout(slide, 2500);
}

export default function decorate(block) {
  slideBanner(block);
}
