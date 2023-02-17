// select
let selectItem = [...document.querySelectorAll('.js-select')]
selectItem.forEach(item => {
  if (item.querySelector('.js-select-header')) {
    item.querySelector('.js-select-header').onclick = function () {
      selectOpen(this)
    }
  }
})

function selectOpen(item) {
  let self = item.closest('.js-select')

  if (self.classList.contains('active')) {
    self.classList.remove('active')
  } else {
    self.classList.add('active')
  }

  selectBody(self)
}

function selectBody(self) {
  self.querySelector('.js-select-body').onclick = function (event) {
    let activeItem;
    let item = event.target.closest('.js-select-item')
    let input = self.querySelector('input')
    let span = self.querySelector('.js-select-header span')

    if (item) {
      activeItem = self.querySelector('.js-select-item.active')
      if (activeItem) activeItem.classList.remove('active')
      item.classList.add('active')
      self.classList.remove('active')

      if(span) span.textContent = item.textContent
      if(input) input.value = item.dataset.value
      input.classList.add('active')

    }
  }
}

document.addEventListener('mousedown', event => {
  let select = document.querySelector('.js-select.active')
  if (select && !event.target.closest('.js-select.active')) {
    select.classList.remove('active')
  }
})
