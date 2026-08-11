export default function decorate(block) {
  const row = block.querySelector(':scope > div');

  if (!row) return;

  const cells = [...row.querySelectorAll(':scope > div')];

  const desktopUrl = cells[0]?.textContent.trim();
  const mobileUrl = cells[1]?.textContent.trim();

  if (!desktopUrl) return;

  const video = document.createElement('video');

  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const mediaQuery = window.matchMedia('(max-width: 900px)');

  function updateVideo() {
    const newUrl = mediaQuery.matches && mobileUrl
      ? mobileUrl
      : desktopUrl;

    const currentUrl = video.getAttribute('src');

    if (currentUrl === newUrl) return;

    video.pause();
    video.src = newUrl;
    video.load();

    video.play().catch(() => {
      // Ignore autoplay rejection.
    });
  }

  block.replaceChildren(video);

  updateVideo();

  mediaQuery.addEventListener('change', updateVideo);

  // Also handle browser/devtools resize behavior.
  window.addEventListener('resize', updateVideo);
}
