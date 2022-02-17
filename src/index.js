document.addEventListener('DOMContentLoaded', () => {
  getAllQuotes()
})

let quoteArr = []
let likeId = 2
let created = 1558524358
const quoteList = document.querySelector('ul#quote-list')

let getAllQuotes = () => {
  fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(quotes => quoteArr = [...quotes])
    .then(quotes => quotes.forEach(quote => renderEachQuote(quote)))
  // .then(quotes => console.log(quotes))
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
  const btnSuc = makeEl('button')
  const btnDan = makeEl('button')

  card.id = input.id

  //---------- SET CLASS TO EACH ELEMENT /-----------//
  setClass(card, 'quote-card')
  setClass(blockquote, 'blockquote')
  setClass(p, 'mb-0')
  setClass(footer, 'blockquote-footer')
  setClass(btnSuc, 'btn-success')
  setClass(btnDan, 'btn-danger')

  //------- SET TEXTCONTENT TO EACH ELEMENT --------//
  setContent(p, input.quote)
  setContent(footer, input.author)
  setContent(btnDan, 'Delete')

  btnSuc.innerHTML = `Likes: <span>${input.likes.length}</span>`  

  //----------- HANDLE SUCCESS BUTTON --------------// 
  btnSuc.addEventListener('click', (e) => {
    let times = e.target.textContent.split(' ')
    times[1] = Number(times[1]) + 1
    btnSuc.innerHTML = `Likes: <span>${times[1]}</span>`

    let incrementLikeId = () => likeId += 1
    let incrementRandNum = () => created += randNum()
    let randNum = () => Math.floor(Math.random() * (100 - 1) + 1)

    let likeObj = {
      id: incrementLikeId(),
      quotedId: input.id,
      createdAt: incrementRandNum()
    }
    input.likes.push(likeObj)
    // updateBackEnd(input.likes)
    console.log(input.likes)
  })

  //------------ HANDLE DELETE BUTTON ---------------//
  btnDan.addEventListener('click', (e) => { 
    e.target.parentNode.remove() 
    const id = e.target.parentNode.id 
    // console.log('quoteArr before update:', quoteArr); 
    
    quoteArr = quoteArr.filter(quote => {
      quote.id != id    
    }) 
    // console.log('quoteArr after update:', quoteArr);    
  }) 
  card.append(blockquote, p, footer, br, btnSuc, btnDan)
  quoteList.appendChild(card)
}

function updateRemoveList(item) {
  fetch(`http://localhost:3000/quotes/${item.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => console.log(data))
}