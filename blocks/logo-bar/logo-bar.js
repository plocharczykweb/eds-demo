export default function decorate(block) {
  const row = block.firstElementChild;

  if (!row) return;

  const imageUrl = row.textContent.trim();

  if (!imageUrl) return;

  block.innerHTML = '';

  const img = document.createElement('img');
  img.className = 'logo-bar-logo';
  img.src = imageUrl;
  img.alt = 'Lovesac';

  block.append(img);
}
