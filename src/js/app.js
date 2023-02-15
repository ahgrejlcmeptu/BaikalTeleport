import {anchors} from "./anchors";
import {tabsInit} from "./utils";
import {sendForm, maskPhone} from "./form";
import {openPopup} from "./modal";

import "./ratingStars"
import "./map"
import "./swiper"
import "./city"
import "./animation"
import "./modal"
import "./myGallery"
import "./navigation"

tabsInit()

document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  const modal = e.target.closest('[data-modal]')
  if (link) anchors(e, link.hash)

  if (modal) {
    e.preventDefault()
    if (modal.dataset.modal === 'popup-rating') {
      if (innerWidth < 1280) return;
      const img = modal.dataset.img
      const modalImg = document.querySelector('.popup-rating-left img')
      if (modalImg) modalImg.src = img
    }
    openPopup(modal)
  }
})

const inputPhone = document.querySelectorAll('input[name="phone"]');
if (inputPhone.length) {
  inputPhone.forEach(item => {
    maskPhone(item)
  })
}

const pageForm = document.querySelectorAll('.page-form');
if (pageForm.length) {
  pageForm.forEach(item => {
    sendForm(item)
  })
}

subscriptionMsg()

function subscriptionMsg() {
  const msgWrap = document.querySelector('.subscription-phone-message')
  if (!msgWrap) return;

  const msg = msgWrap.querySelectorAll('img')
  let index = 0;
  let times = 0

  requestAnimationFrame(function moveMsg() {
    if (msgWrap.classList.contains('_active')) {
      times++
      msgWrap.style.setProperty('--height', `${msg[index].clientHeight}px`)
    }
    const next = (index + 1 > msg.length - 1) ? 0 : index + 1
    if (times > 200) {
      msg[next].classList.add('open')
    }
    if (times > 250) {
      msg[index].classList.add('close')
      msg[next].classList.add('move')
    }
    if (times > 300) {
      msg[index].classList.remove('close', 'active', 'move', 'open')
      msg[next].classList.add('active')
      msg[next].classList.remove('close', 'move', 'open')

      index = next


      times = 0
    }
    requestAnimationFrame(moveMsg);
  })
}

;(function updateSubscription() {
  const subscriptionSelect = document.querySelector('.subscription-select')
  if (subscriptionSelect) {
    const span = subscriptionSelect.querySelector('.subscription-select-header span')
    const input = document.querySelector('.subscription-input input')
    const error = document.querySelector('.subscription-input-error')
    let mask = maskPhone(input)

    subscriptionSelect.onclick = ({target}) => {
      const header = target.closest('.subscription-select-header')
      const item = target.closest('.subscription-select-item')

      if (header) subscriptionSelect.classList.toggle('active')
      if (item) {
        subscriptionSelect.classList.remove('active')
        const active = document.querySelector('.subscription-select-item.active')
        if (active) active.classList.remove('active')
        span.textContent = item.querySelector('span').textContent

        input.value = ''
        input.type = item.dataset.type
        input.name = item.dataset.name
        input.placeholder = item.dataset.placeholder
        input.dataset.required = item.dataset.required
        error.textContent = item.dataset.error
        item.classList.add('active')

        if (input.name === 'tel') {
          mask = maskPhone(input)
        } else {
          mask.destroy()
          input.onfocus = () => null
          input.onblur = () => null
        }
      }
    }
    document.addEventListener('mousedown', ({target}) => {
      if (!target.closest('.subscription-select')) subscriptionSelect.classList.remove('active')
    })
  }
}());

const coverageInput = document.querySelector('.coverage-input-wrap input')
const coverageBtn = document.querySelector('.coverage-input-wrap .btn')

if (coverageInput && coverageBtn) {
  const coverageModal = document.querySelector('.coverage-modal')
  coverageBtn.onclick = () => {
    const active = coverageInput.value.length > 2
    if (!coverageModal) return
    if (active) {
      coverageModal.classList.add('active')
    } else {
      coverageModal.classList.remove('active')
    }
  }
}

document.addEventListener('mousedown', ({target}) => {
  const coverageModal = document.querySelector('.coverage-modal')
  if (!target.closest('.coverage-modal') && coverageModal) {
    coverageModal.classList.remove('active')
  }
})
