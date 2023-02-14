const headerCity = [...document.querySelectorAll('.js-city')]
const modalCity = document.querySelector('.modal-city')
const tariffsWrap = document.querySelector('.tariffs-title-wrap')

headerCity.forEach(item => {
  if (!item) return;
  // item.onmouseenter = () => {
  //   item.classList.add('active')
  // }
  // item.onmouseleave = () => {
  //   item.classList.remove('active')
  // }
  item.onclick = ({target}) => {
    const open = target.closest('.js-city-open')
    if (open) headerCity.forEach(i => i.classList.toggle('active'))
  }
})

positionModalCity()

function positionModalCity() {
  if (!modalCity) return;

  const visibleItem = headerCity.filter(i => i.clientWidth)[0].getBoundingClientRect()
  let left = visibleItem.x + 'px'

  if (innerWidth < 1280) {
    left = visibleItem.x + visibleItem.width / 2 + 'px'
  }
  if (innerWidth < 960) left = null

  modalCity.style.left = left
}

window.addEventListener('resize', () => {
  positionModalCity()
})

window.addEventListener('load', () => {
  modalCity.classList.add('active')
})

modalCity.addEventListener('click', ({target}) => {
  const btn = target.closest('.btn')
  const change = target.closest('.popup-city-change')

  if (btn) modalCity.classList.remove('active')
  if (change) headerCity.forEach(i => i.classList.add('active'))
})

openTariffs()

function openTariffs() {
  const tariffsBtn = tariffsWrap.querySelector('.tariffs-title-btn')
  const tariffsCity = tariffsWrap.querySelector('.tariffs-city input')
  const tariffsLinks = tariffsWrap.querySelectorAll('.tariffs-city-link')
  if (!tariffsWrap) return

  tariffsBtn.addEventListener('click', () => {
    tariffsWrap.classList.toggle('active')
  })

  tariffsCity.oninput = () => {
    const val = tariffsCity.value
    tariffsLinks.forEach(link => {
      if (link.textContent.toLowerCase().indexOf(val.toLowerCase()) === -1) {
        link.style.display = 'none'
      } else {
        link.style.display = null
      }
    })
  }

}

document.addEventListener('mousedown', ({target}) => {
  if (!target.closest('.js-city') && headerCity.length) {
    headerCity.forEach(i => i.classList.remove('active'))
  }
  if (!target.closest('.popup-city') && modalCity) {
    modalCity.classList.remove('active')
  }
  if (!target.closest('.tariffs-title-wrap') && tariffsWrap) {
    tariffsWrap.classList.remove('active')
  }
})
