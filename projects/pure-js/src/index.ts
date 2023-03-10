import './index.scss'

const say = (statements: string) => {
  const words = `hi ${statements}`
  console.log(words)
}

say('sechi')

const div = document.createElement('div')
const span = document.createElement('span')

div.appendChild(span)

div.classList.add('demo')
span.classList.add('message')

span.textContent = 'Hello world'

document.body.appendChild(div)
