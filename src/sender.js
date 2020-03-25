class Sender {
  constructor() {
    this.fio = localStorage.getItem('fio')
    this.phone = localStorage.getItem('phone')
    this.inn = localStorage.getItem('inn')
    this.bday = localStorage.getItem('bday')
  }

  send() {
    let data = {
      fio: this.fio,
      phone: this.phone,
      inn: this.inn,
      bday: this.bday
    }

    const request = fetch('https://localhost:3000/submit', { method: 'POST', body: JSON.stringify(data) })

    console.log('Запрос отправлен', data)
  }
}
