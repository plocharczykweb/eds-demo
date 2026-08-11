export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows[0];
  const urlRow = rows[1];

  if (!urlRow) return;

  const title = titleRow?.textContent.trim() || 'Embedded content';
  const url = urlRow.textContent.trim();

  if (!url) return;

  block.innerHTML = '';

  const iframe = document.createElement('iframe');

  iframe.src = url;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.allow = 'fullscreen';
  iframe.setAttribute('scrolling', 'no');

  block.append(iframe);
}
