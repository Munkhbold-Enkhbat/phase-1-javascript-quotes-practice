document.addEventListener('DOMContentLoaded', () => {
  getAllQuotes()
})

const quoteList = document.querySelector('ul#quote-list')

let getAllQuotes = () => {
  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quotes => quotes.forEach(renderEachQuote))
}

/************* HELPER FUNCTIONS *************/
let makeEl = el => document.createElement(el)
let setClass = (el, name) => el.className = name
let setContent = (el, content) => el.textContent = content

let renderEachQuote = (input) => {

  /*********** CREATE ELEMENTS FOR EACH CARD *******/
  const card = makeEl('li')
  const blockquote = makeEl('blockquote')
  const p = makeEl('p')
  const br = makeEl('br')
  const footer = makeEl('footer')
  const span = makeEl('span')
  const btnSuc = makeEl('button')
  const btnDan = makeEl('button')

  //---------- SET CLASS TO EACH ELEMENT /-----------/
  setClass(card, 'quote-card')
  setClass(blockquote, 'blockquote')
  setClass(p, 'mb-0')
  setClass(footer, 'blockquote-footer')
  setClass(btnSuc, 'btn-success')
  setClass(btnDan, 'btn-danger')
  
  setContent(p, input.quote)
  setContent(footer, input.author)
  setContent(btnDan, 'Delete')
  setContent(span, input.id)

  btnSuc.innerText = `Likes: ${span}`
  btnSuc.textContent = 'Likes:'

  // btnSuc.addEventListener('click', )


  card.append(blockquote, p, footer, br, btnSuc, btnDan)
  quoteList.appendChild(card)
}