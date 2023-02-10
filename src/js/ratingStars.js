const items = document.querySelectorAll('.rating-item') || []

items.forEach(item => {
  const rating = item.querySelector('.rating-item-span span').textContent.split(',')
  const starts = item.querySelectorAll('.rating-item-star')

  for(let i = 0; i < rating[0] && i < 5; i++) {
    starts[i].style.setProperty('--active', '10')
  }
  if (+rating[0] >= 5) return;

  starts[+rating[0]].style.setProperty('--active', `${rating[1]}`)
})
