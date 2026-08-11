export default function decorate(block) {
  const rows = [...block.children];

  const imageRow = rows[0];
  const headingRow = rows[1];
  const bodyRow = rows[2];
  const bottomRow = rows[3];

  if (!imageRow || !headingRow) return;

  const imageUrl = imageRow.textContent.trim();
  const headingText = headingRow.textContent.trim();
  const bodyText = bodyRow?.textContent.trim() || '';

  block.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.className = 'full-right-side-caption-inner';

  const media = document.createElement('div');
  media.className = 'full-right-side-caption-media';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = headingText;
  img.loading = 'lazy';

  media.append(img);

  const content = document.createElement('div');
  content.className = 'full-right-side-caption-content';

  const heading = document.createElement('h2');
  heading.textContent = headingText;
  content.append(heading);

  if (bodyText) {
    const body = document.createElement('p');
    body.className = 'full-right-side-caption-body';
    body.textContent = bodyText;
    content.append(body);
  }

  if (bottomRow) {
    const bottom = document.createElement('div');
    bottom.className = 'full-right-side-caption-bottom';

    const sourceCell = bottomRow.firstElementChild;

    if (sourceCell) {
      while (sourceCell.firstChild) {
        bottom.append(sourceCell.firstChild);
      }
    }

    content.append(bottom);
  }

  wrapper.append(media, content);
  block.append(wrapper);
}
