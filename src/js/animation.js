;(function () {
  const animScroll = document.querySelector('._anim-scroll')
  const animList = document.querySelectorAll('._anim-list')

  if (!animScroll) return

  if (animList.length) {
    animList.forEach((item) => {
      let top = 0;
      let delay = 0
      const list = item.querySelectorAll('._anim-items')
      list.forEach((item, index) => {

        if (top == item.getBoundingClientRect().y) {
          delay += 0.1
        } else {
          delay = 0
          top = item.getBoundingClientRect().y
        }
        item.style.animationDelay = delay + 's'
      })
    })
  }

  const animItems = [...document.querySelectorAll('._anim-items')]

  if (animItems.length) {
    animItems.forEach(item => {
      item.style.animationDelay = item.getAttribute('data-delay') + 's'
    })
  }


  document.addEventListener('scroll', () => {
    animOnScroll()
  })

  window.addEventListener('load', () => [
    setTimeout(() => {
      animOnScroll()
    }, 300)
  ])

  function animOnScroll() {
    if (animItems) {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index]
        const animItemOffset = animItem.getBoundingClientRect().y

        const screenStart = innerHeight - innerHeight / 4
        if (screenStart > animItemOffset) {
          animItem.classList.add('_active')
        }
      }
    }

    function offset(el) {
      const rect = el.getBoundingClientRect()
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
  }
}())
