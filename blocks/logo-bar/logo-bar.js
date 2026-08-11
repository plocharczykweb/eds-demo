export default function decorate(block) {
  const row = block.firstElementChild;

  if (!row) return;

  let imageUrl = row.textContent.trim();

  if (!imageUrl) return;

  // SVGs should be requested directly rather than through
  // Lovesac's raster image transformation parameters.
  if (imageUrl.toLowerCase().includes('.svg')) {
    imageUrl = imageUrl.split('?')[0];
  }

  block.innerHTML = '';

  const img = document.createElement('img');
  img.className = 'logo-bar-logo';
  img.src = imageUrl;
  img.alt = 'Lovesac';

  block.append(img);
}
