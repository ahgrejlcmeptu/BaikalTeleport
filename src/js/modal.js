import {bodyLock, bodyUnLock} from "./utils";

let closeId = null

export function openPopup(btn) {
  const id = btn.dataset.modal
  const form = btn.dataset.form
  const create = btn.dataset.create

  const modal = document.getElementById(id)
  if (!modal) return

  if (form) setFormName(form, modal)
  if (create) createContent(modal, create)

  modal.classList.add('open')

  const container = modal.querySelector('.popup-container')
  if (container) {
    container.scrollTop = 0
  }
  closePopup(modal)
  bodyLock()
}

function closePopup(modal) {
  modal.onclick = ({target}) => {
    const close = target.closest('.js-close')
    const backdrop = target.classList.contains('js-backdrop')

    if (!close && !backdrop) return;

    if (!(modal.id === 'popup-kit' && target.closest('.btn.js-close'))) {
      formKit = null
    }

    modal.classList.add('close')
    closeId = setTimeout(() => {
      modal.classList.remove('close', 'open')
      const openModal = document.querySelectorAll('.popup.open')
      if (!openModal.length) bodyUnLock()
    }, 400)
  }
}

function setFormName(name, modal) {
  const input = modal.querySelector('[name="form-name"]')
  input.value = name
}

function createContent(modal, id) {
  const content = document.getElementById(id)

  if (!content) return;

  const jsCreate = modal.querySelector('.js-create')
  const jsCreateBlock = modal.querySelector('.js-create-block')

  if (jsCreateBlock) jsCreateBlock.remove()

  const clone = content.cloneNode(true)
  clone.classList.add('js-create-block')

  jsCreate.insertAdjacentElement('afterbegin', clone)

}
