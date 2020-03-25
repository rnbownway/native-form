class Sender {
  constructor() {
    this.fio = localStorage.getItem('fio')
    this.phone = localStorage.getItem('phone')
    this.inn = localStorage.getItem('inn')
    this.bday = localStorage.getItem('bday')
  }

  send() {
    let promise = new Promise(res => {
      setTimeout(
        res,
        1000,
        `form submitted: fio: ${this.fio}, phone: ${this.phone}, inn: ${this.inn}, bday: ${this.bday}`
      )
    })
    promise.then(result => console.log(result))
  }
}
