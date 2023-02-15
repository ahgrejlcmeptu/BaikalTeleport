const popupNavLi = [...document.querySelectorAll('.popup-menu-nav li')]
popupNavLi.forEach(li => {
  const item = li.querySelector('.popup-menu-nav-item')
  const body = li.querySelector('.popup-menu-nav-body')
  const links = [...li.querySelectorAll('.popup-menu-nav-link')]

  if (!body) return;

  item.addEventListener('click', (e) => {
    if (innerWidth > 719) return
    e.preventDefault()
    const height = links.reduce((sum, item) => sum + item.clientHeight, 0)
    body.style.setProperty('--height', height + 'px')
    li.classList.toggle('active')
  })
})
