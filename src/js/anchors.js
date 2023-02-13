const header = document.querySelector('.header')

export function anchors(e, link) {
  let idItem = document.getElementById(link.slice(1))

  if (!idItem) return
  if (e) e.preventDefault()

  const top = idItem.getBoundingClientRect().y + pageYOffset + 5
  let scrollTop = top - header.clientHeight;

  // var hash = location.hash.replace(/#/, '');
  // history.pushState(null,null, location.pathname);

  window.scrollTo({
    top: scrollTop,
    behavior: "smooth"
  });
}
