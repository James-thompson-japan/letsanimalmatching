const gridOne = document.querySelector(".gridOne");
const gridTwo = document.querySelector(".gridTwo")
const gridOneHeader = document.querySelector(".gridOneHeader")
const gridTwoHeader = document.querySelector(".gridTwoHeader")
const animalsToChoose = document.querySelector(".animalsToChoose")
const animalsLeftToChoose = document.querySelector(".animalsLeftToChoose")
const contOrReset = document.querySelector(".contOrReset")
const gridTwoHeaderDiv = document.querySelector(".gridTwoHeaderDiv")
const gamesTime = document.querySelector(".gamesTime")

let animalsChosen = 0
let playing = false
let animalsChosenArray = []
let viewAnimalsChosenArray = []
let chosenCards = []
let chosenCardsName = []
let cardsWon = []
let time = 0


const gamesCompleted = () => {
  if(!localStorage.getItem('gamesCompleted')){
    localStorage.setItem('gamesCompleted',0)
  }
  let gamesCompletedNo = document.querySelector(".gamesCompletedNo")
  let gamesCompletedStoredNo = JSON.parse(localStorage.getItem('gamesCompleted'));
  gamesCompletedNo.textContent = gamesCompletedStoredNo
}

const animalsToChooseFrom = 
[
  {
    name:'Badger',
    img:'images/Badger.png'
},
  {
    name:'Bear',
    img:'images/Bear.png'
},
  {
    name:'Bird',
    img:'images/Bird.png'
},
  {
    name:'Cat',
    img:'images/Cat.png'
},
  {
    name:'Elephant',
    img:'images/Elephant.png'
},
  {
    name:'Frog',
    img:'images/Frog.png'
},
  {
    name:'Giraffe',
    img:'images/Giraffe.png'
},
  {
    name:'Gorilla',
    img:'images/Gorilla.png'
},
  {
    name:'Lion',
    img:'images/Lion.png'
},
  {
    name:'Panda',
    img:'images/Panda.png'
},
  {
    name:'Pig',
    img:'images/Pig.png'
},
  {
    name:'Sheep',
    img:'images/Sheep.png'
}
]

function animalsToChooseFromFunc () {
  if(localStorage.getItem('lastTime')){
    let storedTime = localStorage.getItem('lastTime')
    gamesTime.innerHTML = `Last game completed in ${Math.floor(storedTime / 60)}分${storedTime%60}秒`
  }
  for(let i = 0; i < animalsToChooseFrom.length; i++){
    let card = document.createElement('img')
    card.setAttribute('src',animalsToChooseFrom[i].img)
    card.addEventListener('click',youChoseAnAnimal)
    card.setAttribute('data-id',i)
    gridOne.appendChild(card)
  }
  gridOneHeader.textContent += 'Choose 8 Animals ' 
  animalsLeftToChoose.innerHTML = animalsChosen
}

function youChoseAnAnimal(){
  if(animalsChosenArray.length < 16){
let cards = document.querySelectorAll('img')
let cardId = this.getAttribute('data-id')
animalsChosen++
animalsLeftToChoose.innerHTML = animalsChosen
animalsChosenArray.push(animalsToChooseFrom[cardId])
animalsChosenArray.push(animalsToChooseFrom[cardId])
viewAnimalsChosenArray.push(animalsToChooseFrom[cardId])
cards[cardId].addEventListener('click',removeCardFromChosen)
cards[cardId].removeEventListener('click',youChoseAnAnimal)
cards[cardId].style.visibility = "hidden"
if(animalsChosenArray.length === 16){
  contOrReset.style.visibility = 'visible'
  contOrReset.textContent = "Start!"
  contOrReset.addEventListener('click',gameBoard)
}} 
viewAnimalsChosen()
}

function viewAnimalsChosen(){
  gridTwo.innerHTML = ""
for(let i = 0; i< viewAnimalsChosenArray.length; i++){
  let card = document.createElement('img')
  card.setAttribute('src',viewAnimalsChosenArray[i].img)
  gridTwo.appendChild(card)
}


}

function removeCardFromChosen() {
let cardId = this.getAttribute('data-id')
let cards = document.querySelectorAll('img')
}

function flipCard(){
  let cards = document.querySelectorAll('img')
  let cardId = this.getAttribute('data-id')
  cards[cardId].setAttribute('src',animalsChosenArray[cardId].img)
  chosenCards.push(cardId)
  chosenCardsName.push(animalsChosenArray[cardId].name)
  console.log(chosenCardsName,chosenCards,cardId)
  if(chosenCards.length === 2){
    setTimeout(checkForMatch,500) 
  }
}

function checkForMatch(){
  let cards = document.querySelectorAll('img')
  idOne = chosenCards[0]
  idTwo = chosenCards[1]

if(idOne === idTwo){
  alert("You clicked on the same card twice, Try again!")
 cards[idOne].setAttribute('src','question.png')
 cards[idTwo].setAttribute('src','question.png')
} else if (chosenCardsName[0] === chosenCardsName[1]){
  alert("Well done, you got a match !")
  cards[idOne].style.visibility = "hidden"
  cards[idTwo].style.visibility = "hidden"
  cardsWon.push(chosenCards)
} else if(chosenCardsName[0] !== chosenCardsName[1]){
  alert("Sorry, they didn't match. Try again!")
  cards[idOne].setAttribute('src','question.png')
  cards[idTwo].setAttribute('src','question.png')
}
if(cardsWon.length === animalsChosenArray.length/2){
  gridOne.innerHTML = `<h3>Well done,you completed the game !</h3>`
  let score = JSON.parse(localStorage.getItem('gamesCompleted'))
  score++
  localStorage.setItem('gamesCompleted',JSON.stringify(score))
  localStorage.setItem('lastTime',time)

}
  chosenCardsName = []
  chosenCards = []
}

function gameBoard(){
  setInterval(() => {
    time++
    console.log(time)
  }, 1000);
  animalsChosenArray.sort(() => Math.random() - 0.5)
  if(contOrReset.textContent === "Start!"){
  gridOne.innerHTML=""
  gridTwo.style.display = "none"
  gridOneHeader.innerHTML=""
  gridTwoHeaderDiv.innerHTML=""
  contOrReset.innerHTML = "Reset and play again!"
  contOrReset.addEventListener('click',() =>window.location.reload())
}
  for(let i = 0;i < animalsChosenArray.length; i++){
    let card = document.createElement('img')
    card.setAttribute('src', 'question.png')
    card.addEventListener('click',flipCard)
    card.setAttribute('data-id',i)
    gridOne.appendChild(card)
  }
}








animalsToChooseFromFunc() 
gamesCompleted()