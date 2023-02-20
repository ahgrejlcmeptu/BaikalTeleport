export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

export function bodyLock() {
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');
  const lockPaddingValue = window.innerWidth - body.offsetWidth + 'px';
  for (let index = 0; index < lockPadding.length; index++) {
    const el = lockPadding[index];
    el.style.paddingRight = lockPaddingValue;
  }
  body.style.overflow = 'hidden'
}

export function bodyUnLock() {
  const lockPadding = document.querySelectorAll('.lock-padding');
  const body = document.querySelector('body');
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px'
      }
    }
    body.style.overflow = null
  }, 300)
}

export function videoBg() {
  const video = document.querySelectorAll('.page-bg video')

  if (!video.length) return

  video.forEach(v => {
    v.src = v.dataset.src
    v.play()
  })
}

export function touchSupport () {
  return 'ontouchstart' in window
    || window.DocumentTouch && document instanceof window.DocumentTouch;
}

export function tabsInit() {
  const tabsBlock = document.querySelectorAll('.tabs-block')
  if (!tabsBlock.length) return

  tabsBlock.forEach(block => {
    const btns = block.querySelectorAll('.tabs-btn')
    const items = block.querySelectorAll('.tabs-item')
    let activeBtn = 0,
      activeItem = 0

    btns.forEach((b, i) => {
      b.addEventListener('click', () => {

        if (b.dataset.tabs === '+1') {
          btns[activeBtn].classList.remove('active')
          items.forEach(t => t.classList.remove('active'))

          activeBtn = i

          if (i === 0) {
            btns[activeBtn].classList.add('active')
            items.forEach(t => t.classList.add('active'))
            return;
          }

          btns[activeBtn].classList.add('active')
          items[activeBtn - 1].classList.add('active')
          return
        }

        btns[activeBtn].classList.remove('active')
        items[activeItem].classList.remove('active')

        activeBtn = i
        activeItem = items.length-1 < activeBtn ? 0 : i

        btns[activeBtn].classList.add('active')
        items[activeItem].classList.add('active')
      })
    })
  })
}

export function svgLength() {
  const jsSvg =  [...document.querySelectorAll(".js-svg")];
  jsSvg.forEach((svg) => {
    svg.style.setProperty('--stroke', svg.querySelector("path").getTotalLength())
  });
}

export function copyInput(str) {
  let tmp = document.createElement('INPUT');
  tmp.value = str;
  document.body.appendChild(tmp);
  tmp.select();
  document.execCommand('copy');
  document.body.removeChild(tmp);
}
