export default function decorate(block) {
  const rows = [...block.children];

  const headingRow = rows[0];
  const descriptionRow = rows[1];
  const buttonRow = rows[2];
  const desktopVideoRow = rows[3];
  const mobileVideoRow = rows[4];

  if (!headingRow || !desktopVideoRow) return;

  const headingText = headingRow.textContent.trim();
  const descriptionText = descriptionRow?.textContent.trim() || '';

  const desktopVideoUrl = desktopVideoRow.textContent.trim();
  const mobileVideoUrl =
    mobileVideoRow?.textContent.trim() || desktopVideoUrl;

  const sourceLink = buttonRow?.querySelector('a');

  let buttonText =
    sourceLink?.textContent.trim()
    || buttonRow?.textContent.trim()
    || '';

  // If the nested authored table contributes the word "button",
  // remove it from the visible CTA text.
  buttonText = buttonText.replace(/^button\s*/i, '').trim();

  block.innerHTML = '';

  const inner = document.createElement('div');
  inner.className = 'padded-left-side-caption-inner';

  const content = document.createElement('div');
  content.className = 'padded-left-side-caption-content';

  const heading = document.createElement('h2');
  heading.textContent = headingText;
  content.append(heading);

  if (descriptionText) {
    const description = document.createElement('p');
    description.className = 'padded-left-side-caption-description';
    description.textContent = descriptionText;
    content.append(description);
  }

  if (buttonText) {
    let button;

    if (sourceLink) {
      button = sourceLink.cloneNode(true);
    } else {
      button = document.createElement('button');
      button.type = 'button';
      button.textContent = buttonText;
    }

    button.className = 'padded-left-side-caption-button';
    content.append(button);
  }

  const media = document.createElement('div');
  media.className = 'padded-left-side-caption-media';

  const video = document.createElement('video');

  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  const mobileQuery = window.matchMedia('(max-width: 900px)');

  function setVideoSource() {
    const newUrl = mobileQuery.matches
      ? mobileVideoUrl
      : desktopVideoUrl;

    if (video.src === newUrl) return;

    video.src = newUrl;
    video.load();

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be blocked by the browser.
      });
    }
  }

  setVideoSource();

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', setVideoSource);
  } else {
    mobileQuery.addListener(setVideoSource);
  }

  media.append(video);

  inner.append(content, media);
  block.append(inner);
}
