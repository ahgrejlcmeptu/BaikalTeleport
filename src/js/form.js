import IMask from 'imask';
const authForm = document.querySelectorAll('.auth-form-item')

const validation = {
  validatePhone(input) {
    const parent = input.closest('.input-parent')

    if (input.value.length < 16) {
      parent.classList.add("error");
      return true;
    } else {
      parent.classList.remove("error");
      return false;
    }
  },
  validateEmail(input) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    const parent = input.closest('.input-parent')

    if (!input.value.length) {
      parent.classList.add("error");
      return true;
    } else if (!reg.test(input.value)) {
      parent.classList.add("error");
      return true;
    } else {
      parent.classList.remove("error");
      return false;
    }
  },
  validateText(input) {
    const parent = input.closest('.input-parent')

    if (input.value.length < 1) {
      parent.classList.add("error");
      return true;
    } else {
      parent.classList.remove("error");
      return false;
    }
  },
  validateCheck(input) {
    return false
    const parent = input.closest('.input-parent')

    if (input.value.length < 1) {
      parent.classList.add("error");
      return true;
    } else {
      parent.classList.remove("error");
      return false;
    }
  }
}

const maskOptions = {
  mask: '+{7} (#00) 000 00 00',
  definitions: {
    '#': /[1-7]|[9]/
  }
};

export function sendForm(item) {
  item.onsubmit = async (e) => {
    e.preventDefault()
    let data = new FormData(item)
    const src = item.getAttribute('action');
    const ya = item.dataset.ya;
    const checkInput = item.querySelectorAll('.required-group')
    let error = false
    const dataJson = {}

    error = item.querySelector('[name="politic"]') ? !item.querySelector('[name="politic"]').checked : false
    data.delete('politic')

    for (let entries of data.entries()) {
      let input = item.querySelector(`[name='${entries[0]}']`)
      let valid = input.getAttribute('data-required')

      if (valid) {
        error = (validation[valid](input)) ? true : error
      }

      dataJson[entries[0]] = entries[1]
    }

    if (checkInput.length) {
      checkInput.forEach(group => {
        const input = group.querySelectorAll('input')
        let check = false
        input.forEach(i => {
          if (check) return

          check = i.checked
        })

        if (check) {
          group.classList.remove('error')
        } else {
          group.classList.add('error')
        }

        error = check ? error : true
      })
    }

    if (error) return

    let response = await fetch(src, {
      method: 'POST',
      body: JSON.stringify(dataJson)
    });

    if (response.ok) {
      console.log('Форма отправлена')
      item.classList.add('active')

      if (dataJson['form-name'] === 'auth-phone') {
        authForm[0].classList.remove('active')
        authForm[1].classList.add('active')
        console.log('вызов')
        formCode(authForm[1])
      } else {
        item.reset()
      }


      if (ya) {
        ym(85294102, 'reachGoal', ya);
        console.log('Цель: ' + ya);
      }

      setTimeout(() => {
        item.classList.remove('active')
      }, 5000)

    } else {
      console.log("Ошибка HTTP: " + response.status)
    }
  }
}

export function validationForm(item) {
  item.onsubmit = async (e) => {
    e.preventDefault()
    let data = new FormData(item)
    const checkInput = item.querySelectorAll('.required-group')
    let error = false
    const dataJson = {}

    error = item.querySelector('[name="politic"]') ? !item.querySelector('[name="politic"]').checked : false
    data.delete('politic')

    for (let entries of data.entries()) {
      let input = item.querySelector(`[name='${entries[0]}']`)
      let valid = input.getAttribute('data-required')

      if (valid) {
        error = (validation[valid](input)) ? true : error
      }

      dataJson[entries[0]] = entries[1]
    }

    if (checkInput.length) {
      checkInput.forEach(group => {
        const input = group.querySelectorAll('input')
        let check = false
        input.forEach(i => {
          if (check) return

          check = i.checked
        })

        if (check) {
          group.classList.remove('error')
        } else {
          group.classList.add('error')
        }

        error = check ? error : true
      })
    }
  }
}

export function maskPhone(item) {
  let mask = IMask(item, maskOptions);

  item.onfocus = function () {
    mask.updateOptions({
      lazy: false,
    })
  }
  item.onblur = function () {
    mask.updateOptions({
      lazy: true,
    })
  }

  return mask
}

function clearError(form) {
  const errors = [...form.querySelectorAll('.error')]
  errors.forEach(err => err.classList.remove('error'))
}

function formCode(item) {
  const back = item.querySelector('.btn-stroke')
  const form = item.querySelector('form')
  const repeat = item.querySelector('.auth-form-repeat')
  const repeatSpan = repeat.querySelector('span')
  const forgot = item.querySelector('.auth-form-forgot a')
  let time = 60
  let repeatId = null

  repeatSpan.textContent = time

  clearError(form)
  repeatId = setInterval(() => {
    repeatSpan.textContent = time
    time--

    if (time === -1) {
      clearInterval(repeatId)
      repeat.classList.add('hidden')
    }
  }, 1000)

  back.onclick = () => {
    authForm[0].classList.add('active')
    authForm[1].classList.remove('active')
    clearInterval(repeatId)
    repeat.classList.remove('hidden')
  }

  forgot.onclick = (e) => {
    e.preventDefault()
    const form = authForm[0].querySelector('form.active')
    const button = form.querySelector("[type='submit']")
    button.click()

    clearInterval(repeatId)
    repeat.classList.remove('hidden')
  }
}
