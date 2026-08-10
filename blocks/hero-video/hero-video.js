export default function decorate(block) {
  const url = block.textContent.trim();

  if (!url) return;

  const video = document.createElement('video');

  video.src = url;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  block.replaceChildren(video);
}
