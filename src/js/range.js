const range = [...document.querySelectorAll('.input-range')]

range.forEach(r => {
  const inputRange = r.querySelector('input[type="range"]')
  const progress = r.querySelector('.input-range-progress')
  const cells = r.querySelectorAll('.input-range-cell')
  progressRange(progress, inputRange, cells)
  inputRange.addEventListener('input', () => {
    progressRange(progress, inputRange, cells)
  })
})

function progressRange(progress, input, cells) {
  const value = parseInt(input.value)
  const min = parseInt(input.min)
  const max = parseInt(input.max)

  const scale = (value - min) / (max - min)

  cells.forEach((i, idx) => {
    idx < value - min ? i.classList.add('active') : i.classList.remove('active')
    idx === value - min ? i.classList.add('select') : i.classList.remove('select')
  })

  progress.style.setProperty('--scale', scale)
}
