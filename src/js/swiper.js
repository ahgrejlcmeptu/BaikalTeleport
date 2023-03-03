import Swiper from 'swiper/swiper-bundle';

const sliderDefault = [
  '.services-slider',
  '.discounts-slider',
  '.tariffs-slider',
  '.stories-slider',
  '.tariffs-buttons',
  '.advantages-slider',
  '.destination-slider',
  '.giveday-slider'
]

sliderDefault.forEach(slide => {
  new Swiper(slide, {
    slidesPerView: 'auto',
    slideDuplicateClass: '-duplicate'
  });
})

new Swiper('.article-slider', {
  slidesPerView: 'auto',
  loop: 'auto',
  slideDuplicateClass: '-duplicate',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});

new Swiper('.offers-slider', {
  loop: true,
  slideDuplicateClass: '-duplicate',
  pagination: {
    el: '.offers-pagination',
    clickable: true
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  on: {
    slideChange: function () {
      const bg = document.querySelectorAll('.offers-bg')
      bg.forEach(i => i.classList.remove('active'))
      bg[this.realIndex].classList.add('active')
    },
    init: function () {
      const el = this.slides.filter(i => {
        if (!i.classList.contains('-duplicate')) return i
      })

      if (el.length === 1) {
        const wrap = this.el
        this.destroy(true, true)

        wrap.classList.add('swiper-initialized')
      }
    }
  }
});

const swiperResizeUnit = (props) => {
  const self = props.self
  const el = document.querySelector(`.${self.key}`)
  if (!el) return

  if (props.init) {
    if (!swiperList[self.key].swiper) {
      swiperList[self.key].swiper = new Swiper(el, {
        slidesPerView: 'auto',
        slideDuplicateClass: '-duplicate'
      });
    }
  } else {
    if (swiperList[self.key].swiper) {
      swiperList[self.key].swiper.destroy(true, true);
      swiperList[self.key].swiper = null;
    }
  }
}

const swiperList = {
  'rating-slider': {
    swiper: null,
    key: 'rating-slider',
    init() {
      swiperResizeUnit({self: this, init: innerWidth < 720})
    }
  }
}

for (let key in swiperList) {
  swiperList[key].init()
}
window.addEventListener('resize', () => {
  for (let key in swiperList) {
    swiperList[key].init()
  }
})

window.coverageSlider = () => {
  const coverSlide = document.querySelector('.coverage-modal-slider')
  if (!coverSlide) return

  new Swiper(coverSlide, {
    slidesPerView: 'auto',
    slideDuplicateClass: '-duplicate'
  });
}
coverageSlider()
