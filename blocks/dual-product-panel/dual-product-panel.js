export default function decorate(block) {
  const rows = [...block.children];

  const imageRow = rows[0];
  const titleRow = rows[1];
  const descriptionRow = rows[2];
  const metaRow = rows[3];

  if (!imageRow || !titleRow) return;

  const images = [...imageRow.children].map((cell) => cell.textContent.trim());
  const titles = [...titleRow.children].map((cell) => cell.textContent.trim());

  const descriptions = descriptionRow
    ? [...descriptionRow.children].map((cell) => cell.textContent.trim())
    : [];

  const meta = metaRow
    ? [...metaRow.children].map((cell) => cell.textContent.trim())
    : [];

  block.innerHTML = '';

  images.forEach((src, index) => {
    if (!src) return;

    const panel = document.createElement('div');
    panel.className = 'dual-product-panel-item';

    const img = document.createElement('img');
    img.src = src;
    img.alt = titles[index] || '';
    img.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'dual-product-panel-content';

    if (titles[index]) {
      const title = document.createElement('h2');
      title.textContent = titles[index];
      content.append(title);
    }

    if (descriptions[index]) {
      const description = document.createElement('p');
      description.className = 'dual-product-panel-description';
      description.textContent = descriptions[index];
      content.append(description);
    }

    if (meta[index]) {
      const metaText = document.createElement('p');
      metaText.className = 'dual-product-panel-meta';
      metaText.textContent = meta[index];
      content.append(metaText);
    }

    panel.append(img, content);
    block.append(panel);
  });
}
