import Swiper from 'swiper/swiper-bundle';
import {defaults} from "autoprefixer";

const sliderDefault = ['.services-slider', '.discounts-slider', '.tariffs-slider', '.stories-slider', '.tariffs-buttons']

sliderDefault.forEach(slide => {
  new Swiper(slide, {
    slidesPerView: 'auto',
    slideDuplicateClass: '-duplicate'
  });
})

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
