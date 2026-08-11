export default function decorate(block) {
  const row = block.children[0];

  if (!row) return;

  const cells = [...row.children];

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
    const url = mediaQuery.matches && mobileUrl
      ? mobileUrl
      : desktopUrl;

    if (video.src !== url) {
      video.src = url;
      video.load();

      video.play().catch(() => {
        // Autoplay may be prevented by the browser.
      });
    }
  }

  block.replaceChildren(video);

  updateVideo();

  mediaQuery.addEventListener('change', updateVideo);
}
