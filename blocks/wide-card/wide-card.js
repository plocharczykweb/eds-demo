export default function decorate(block) {
  const rows = [...block.children];

  const imageRow = rows[0];
  const titleRow = rows[1];
  const descriptionRow = rows[2];

  if (!imageRow || !titleRow) return;

  const imageUrl = imageRow.textContent.trim();
  const titleText = titleRow.textContent.trim();
  const descriptionText = descriptionRow?.textContent.trim() || '';

  block.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'wide-card-inner';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = titleText;
  img.loading = 'lazy';

  const content = document.createElement('div');
  content.className = 'wide-card-content';

  const title = document.createElement('h2');
  title.textContent = titleText;

  content.append(title);

  if (descriptionText) {
    const description = document.createElement('p');
    description.textContent = descriptionText;
    content.append(description);
  }

  card.append(img, content);
  block.append(card);
}
