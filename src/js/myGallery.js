import Swiper from 'swiper/swiper-bundle';
import {bodyLock, bodyUnLock} from './utils';

;(function () {

  const myOptions = {
    talk: (item) => {
      const footer = `
        <div class="popup-stories__footer">
          <div class="popup-stories__name">${item.querySelector('.stories-item-name').textContent}</div>
          <div class="popup-stories__city">${item.querySelector('.stories-item-city').textContent}</div>
        </div>
      `
      return footer
    },
  }

  const popupHtml = `
      <div class="popup open" id="popup-stories">
      <div class="popup-backdrop"></div>
        <div class="popup-stories">
          <div class="popup-close js-close">
            <svg>
              <use xlink:href="sprite.svg#close"></use>
            </svg>
          </div>
          <div class="swiper js-backdrop">
            <div class="swiper-wrapper js-backdrop"></div>
          </div>
        </div>
      </div>
  `
  let swiperBig;

  document.addEventListener('click', ({target}) => {
    const myGallery = target.closest('[data-myGallery]')
    const popup = target.closest('#popup-stories')

    if (myGallery) {
      const myGalleryList = [...document.querySelectorAll(`[data-myGallery=${myGallery.dataset.mygallery}]`)]
        .filter(item => !item.classList.contains('-duplicate'))

      const galleryOptions = myGallery.dataset.title
      let activeIndex = -1

      document.body.insertAdjacentHTML('beforeend', popupHtml)

      if (myGallery.dataset.option) {
        const modal = document.querySelector('#popup-stories')
        modal.classList.add('popup_' + myGallery.dataset.option)
      }

      const big = document.querySelector('.popup-stories .swiper-wrapper')

      myGalleryList.forEach((item, index) => {
        const options = item.dataset.option

        const video = item.dataset.video ? `
          <div class="popup-stories__video">
            <video src="${item.dataset.video}" playsinline muted></video>
            <div class="popup-stories__play">
              <svg class="wrap"><use xlink:href="sprite.svg#play-wrap"></use></svg>
              <svg class="play"><use xlink:href="sprite.svg#play"></use></svg>
            </div>
          </div>
        ` : ''

        const audio = item.dataset.audio ? `
          <div class="popup-stories__audio">
            <audio src="${item.dataset.audio}"></audio>
            <div class="popup-stories__play">
              <svg class="wrap"><use xlink:href="sprite.svg#play-wrap"></use></svg>
              <svg class="play"><use xlink:href="sprite.svg#play"></use></svg>
            </div>
          </div>
        ` : ''

        const slide = `
          <div class="swiper-slide popup-stories__item">
            <div class="popup-stories__top">
              <img src="${item.dataset.src}" alt="">
              ${video}
              ${audio}
            </div>
            ${options ? myOptions[options](item) : ''}
          </div>
        `

        if (item === myGallery && activeIndex === -1) activeIndex = index

        big.insertAdjacentHTML('beforeend', slide)

      })

      initMyGallery(activeIndex)
      bodyLock()
    }

    if (popup) {
      if (target.classList.contains('js-backdrop') || target.closest('.js-close')) {
        popup.classList.add('close')
        setTimeout(() => {
            popup.classList.remove('open')
            popup.classList.remove('close')
            if (!document.querySelectorAll('.popup.open').length) bodyUnLock()
            popup.remove()
          },
          300)
      }
    }
  })

  function initMyGallery(index) {
    let timerId = null

    swiperBig = new Swiper(".popup-stories .swiper", {
      slidesPerView: 'auto',
      centeredSlides: true,
      initialSlide: index,
      loop: true,
      on: {
        init: function () {
          playVideo(this)
          clickPlay(this)
        },
        slideChange: function () {
          stopVideo(this)
          playVideo(this)
        },
        click: function () {
          const index = this.clickedIndex
          this.slideTo(index)
        }
      }
    });

    function clickPlay(self) {
      const slides = self.slides
      slides.forEach(slide => {
        const video = slide.querySelector('video') || slide.querySelector('audio')
        if (video) {
          video.parentNode.onclick = () => {
            if (slide.classList.contains('played')) {
              video.pause()
              video.muted = true
              slide.classList.remove('played')
              return;
            }

            video.play()
            video.muted = false
            slide.classList.add('played')
          }
        }
      })
    }

    function playVideo(self) {
      const video = self.slides[self.activeIndex].querySelector('video') || self.slides[self.activeIndex].querySelector('audio')
      if (video) {
        stopVideo(self)
        video.play()
        video.muted = false
        self.slides[self.activeIndex].classList.add('played')

        video.onended = () => {
          stopVideo(self)
        }
      }

      progressAudio(self)
    }

    function stopVideo(self) {
      const played = self.$el[0].querySelector('.played')
      if (!played) return;
      const video = played.querySelector('video') || played.querySelector('audio')
      if (!video) return
      video.pause()
      played.classList.remove('played')
    }

    function progressAudio(self) {
      const played = self.$el[0].querySelector('.played')
      if (!played) return;
      const audio = played.querySelector('audio')
      if (!audio) return;

      audio.ontimeupdate = () => {
        console.log(audio.duration, audio.currentTime)
        audio.parentNode.style.setProperty('--currentTime', `${100 - audio.currentTime * 100 / audio.duration}%`)
      }
    }

    // if (innerWidth < 720) {
    //   swiperBig.destroy(true, true)
    // }
  }
}());
