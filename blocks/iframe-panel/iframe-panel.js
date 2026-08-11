export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows[0];
  const urlRow = rows[1];

  if (!urlRow) return;

  const titleText = titleRow?.textContent.trim() || '';
  const url = urlRow.textContent.trim();

  if (!url) return;

  block.innerHTML = '';

  if (titleText) {
    const heading = document.createElement('h2');
    heading.className = 'iframe-panel-heading';
    heading.textContent = titleText;
    block.append(heading);
  }

  const iframe = document.createElement('iframe');

  iframe.src = url;
  iframe.title = titleText || 'Embedded content';
  iframe.loading = 'lazy';
  iframe.allow = 'fullscreen';
  iframe.setAttribute('scrolling', 'no');

  block.append(iframe);
}
