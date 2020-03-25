function isRussianLetter (letter) {
  return (letter >= 'а' && letter <= 'я') || (letter >= 'А' && letter <= 'Я') || (letter === ' ')
}

function isNumber (digit) {
  return (digit >= '0' && digit <= '9')
}

function isCorrectYear(value) {
  const year = value.slice(0, 4)
  const date = new Date()
  const currentYear = date.getFullYear()

  return year > 1900 && currentYear - year > 13
}

const validateRequired = value => (value ? '' : 'field is required')
const validateLengthName = (value) => (value.length > 4 ? '' : 'too short name')
const validateNameCorrect = (value) => {
  for (let symb of value) {
    if (!isRussianLetter(symb))
      return 'only russian letters'
  }

  return ''
}
const validateLengthNumber = (value) => (value.length > 5 ? '' : 'too short phone number')
const validateNumberCorrect = (value) => {
  for (let symb of value) {
    if (!isNumber(symb))
      return 'only digits'
  }

  return ''
}
const validateLengthInn = (value) => (value.length === 12 ? '' : 'invalid length (12 digits expected)')
const validateBirthday = (value) => {
  if (isCorrectYear(value))
    return ''
  else return 'incorrect birthday'
}

const inputValidators = {
  fio: [validateRequired, validateLengthName, validateNameCorrect],
  phone: [validateRequired, validateLengthNumber, validateNumberCorrect],
  inn: [validateRequired, validateLengthInn, validateNumberCorrect],
  bday: [validateRequired, validateBirthday]
}
