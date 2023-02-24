import {anchors} from "./anchors";
import {tabsInit, svgLength, copyInput, textAccordion} from "./utils";
import {sendForm, validationForm, maskPhone} from "./form";
import {openPopup} from "./modal";

import "./ratingStars"
import "./map"
import "./swiper"
import "./city"
import "./animation"
import "./modal"
import "./myGallery"
import "./navigation"
import "./select"

tabsInit()
svgLength()
textAccordion()

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

const inputPhone = [...document.querySelectorAll('input[name="phone"]')];
inputPhone.forEach(item => {
  maskPhone(item)
})

const pageForm = [...document.querySelectorAll('.page-form')];
pageForm.forEach(item => {
  sendForm(item)
})

const pageFormValid = [...document.querySelectorAll('.page-form-valid')];
pageFormValid.forEach(item => {
  validationForm(item)
})

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
  const coverage = document.querySelector('.coverage')
  coverageBtn.onclick = () => {
    const active = coverageInput.value.length > 2
    if (!coverageModal) return
    if (active) {
      coverage.classList.add('open')
      coverageModal.classList.add('active')
    } else {
      coverage.classList.remove('open')
      coverageModal.classList.remove('active')
    }
  }
}

document.addEventListener('mousedown', ({target}) => {
  const coverageModal = document.querySelector('.coverage-modal')
  if (!target.closest('.coverage-modal') && coverageModal) {
    coverageModal.classList.remove('active')
    document.querySelector('.coverage').classList.remove('open')
  }
  const questionsActive = document.querySelector('.questions-item.active')
  if (!target.closest('.questions-item') && questionsActive) {
    questionsActive.classList.remove('active')
  }

  const copy = document.querySelector('.speedtest-panel-footer ._text')
  if (target.closest('.speedtest-panel-footer ._copy') && copy) {
    copyInput(copy.textContent)
  }
})

const questions = [...document.querySelectorAll('.questions-item')]
questions.forEach(item => {
  const header = item.querySelector('.questions-item-header')
  const wrap = item.querySelector('.questions-item-wrap')
  header.onclick = () => {
    item.style.setProperty('--height', wrap.clientHeight + 'px')

    if (item.classList.contains('active')) {
      item.classList.remove('active')
    } else {
      const active = document.querySelector('.questions-item.active')
      if (active) active.classList.remove('active')
      item.classList.add('active')
    }
  }
})
