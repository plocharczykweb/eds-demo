export default function decorate(block) {
  const rows = [...block.children];

  const headingRow = rows[0];
  const descriptionRow = rows[1];
  const buttonRow = rows[2];
  const videoRow = rows[3];

  if (!headingRow || !videoRow) return;

  const headingText = headingRow.textContent.trim();
  const descriptionText = descriptionRow?.textContent.trim() || '';
  const videoUrl = videoRow.textContent.trim();

  const sourceLink = buttonRow?.querySelector('a');

  let buttonText = sourceLink?.textContent.trim()
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
  video.src = videoUrl;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;

  media.append(video);

  inner.append(content, media);
  block.append(inner);
}
