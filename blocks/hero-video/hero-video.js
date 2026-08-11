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

  // Mobile source
  if (mobileUrl) {
    const mobileSource = document.createElement('source');
    mobileSource.src = mobileUrl;
    mobileSource.media = '(max-width: 900px)';
    mobileSource.type = 'video/mp4';

    video.append(mobileSource);
  }

  // Desktop/default source
  const desktopSource = document.createElement('source');
  desktopSource.src = desktopUrl;
  desktopSource.type = 'video/mp4';

  video.append(desktopSource);

  block.replaceChildren(video);
}
