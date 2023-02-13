import {anchors} from "./anchors";
import {tabsInit} from "./utils";
import {sendForm, maskPhone} from "./form";

import "./ratingStars"
import "./map"
import "./swiper"
import "./city"

tabsInit()

document.addEventListener('click', (e) => {
  const link = e.target.closest('a')
  if (link) anchors(e, link.hash)
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
    if (msgWrap.classList.contains('active')) {
      times++
      msgWrap.style.setProperty('--height', `${msg[index].clientHeight}px`)
    }
    const next = (index + 1 > msg.length - 1) ? 0 : index + 1
    if (times > 200) {
      msg[next].classList.add('open')
    }
    if (times > 300) {
      msg[index].classList.add('close')
      msg[next].classList.add('move')
    }
    if (times > 350) {
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
        span.textContent = item.querySelector('span').textContent

        input.value = ''
        input.type = item.dataset.type
        input.name = item.dataset.name
        input.placeholder = item.dataset.placeholder
        input.dataset.required = item.dataset.required
        error.textContent = item.dataset.error

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
