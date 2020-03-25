const ENTER_CODE = 13
const FIRST_STEP_FIELDS = ['fio', 'phone']
const SECOND_STEP_FIELDS = ['inn', 'bday']

const fieldError = fieldName => document.getElementById(`${fieldName}_error`)
const field = fieldName => document.getElementById(`${fieldName}`)
const tabs = document.getElementsByClassName('tab')
const steps = document.getElementsByClassName('step')

function autocomplete() {
  if (localStorage.length !== 0) {
    const result = confirm('Прошлая сессия не была закончена, не желаете ее продолжить?')

    if (result) {
      let keys = Object.keys(localStorage);
      for(let key of keys) {
        field(key).value = localStorage.getItem(key)
      }
    }
    else localStorage.clear()
  }
}

function showTab(n) {
  tabs[n].style.display = 'block'

  if (n === 0) {
    document.getElementById('prevBtn').style.display = 'none'
  } else {
    document.getElementById('prevBtn').style.display = 'inline'
  }
  if (n === 1) {
    document.getElementById('nextBtn').innerHTML = 'Отправить'
  } else {
    document.getElementById('nextBtn').innerHTML = 'Дальше'
  }
  if (n === 2) {
    document.getElementById('prevBtn').style.display = 'none'
    document.getElementById('nextBtn').style.display = 'none'
  }

  setActiveStep(n)
}

function switchTab(n) {
  if (n === 1 && !validateForm()) return false

  tabs[currentTab].style.display = 'none'
  currentTab += n

  if (currentTab >= tabs.length - 1) {
    let sender = new Sender()
    sender.send()

    localStorage.clear()
  }

  showTab(currentTab)
}

function setEvents(fields) {
  for (let i = 0; i < fields.length; i++) {
    field(fields[i]).addEventListener('keypress', (event) => {
      if (event.keyCode === ENTER_CODE) {
        const errText = validateInput(event.target)
        if (!errText) {
          if (i === fields.length - 1)  switchTab(1)
          else field(fields[i+1]).focus()
        }
      }
    })
  }
}

function validateInput(input) {
  const validators = inputValidators[input.id]
  const errors = validators.map(validator => validator(input.value))
  const firstError = errors.find(error => Boolean(error))
  const errorDOM = fieldError(input.id)
  if (firstError) {
    input.classList.add('invalid')
    errorDOM.innerText = firstError
  } else {
    errorDOM.innerText = ''
    localStorage.setItem(input.name, input.value)
    input.classList.remove('invalid')
  }

  return firstError
}

function validateForm() {
  let isValid = true,
    isFirst = true

  let inputs = tabs[currentTab].getElementsByTagName('input')

  for (let input of inputs) {
    const errorText = Boolean(validateInput(input))
    if (errorText) {
      isValid = false
      if (isFirst) {
        input.focus()
        isFirst = false
      }
    }
  }
  if (isValid) {
    steps[currentTab].className += ' finish'
  }
  return isValid
}

function setActiveStep(n) {
  for (let step of steps) {
    step.className = step.className.replace(' active', '')
  }

  if (steps[n]) steps[n].className += ' active'
}
