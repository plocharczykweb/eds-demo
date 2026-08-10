export default function decorate(block) {
  const heading = block.querySelector('h1');

  if (heading) {
    heading.textContent = 'My first custom EDS block';
  }
}
