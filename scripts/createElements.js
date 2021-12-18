document.body.onload = addCardElements

async function addCardElements () {
  const wholeContainer = document.getElementById("whole-container")
  const randomizedQuestions = await randomizedQuestionList()

  for (let i = 0; i < 32; ++i) {
    const frontSide = document.createElement("p")
    frontSide.className = 'card-front'
    
    const backSide = document.createElement("p")
    backSide.className = "hidden"
    backSide.appendChild(document.createTextNode(randomizedQuestions[i]))
    
    const newCard = document.createElement("div")
    newCard.className = "card"
    newCard.appendChild(frontSide)
    newCard.appendChild(backSide)

    newCard.addEventListener('click', () => {
      newCard.animate([{
        transform: 'rotateY(0deg)'
      },{
        transform: 'rotateY(360deg)'
      }], 600)

      setTimeout(()=>{
        newCard.firstElementChild.classList.toggle('hidden')
        newCard.lastElementChild.classList.toggle('hidden')
        newCard.classList.toggle('card-back')
      }, 600)
    }, false)

    wholeContainer.appendChild(newCard)
  }
}

async function randomizedQuestionList () {
  let result = []
  let mutableQuestionList = []

  await fetch("../data/selfIntroductionQuestions.json")
  .then(res => res.json())
  .then(result => mutableQuestionList = result.questions)
  .catch(error => console.error("Error:", error));

  const resultLength = mutableQuestionList.length

  for(let i = 0; i < resultLength - 1; ++i) {
    const selectedIndex = (function() {
      return Math.floor(Math.random() * mutableQuestionList.length)
    } ())

    result.push(mutableQuestionList[selectedIndex])

    mutableQuestionList =
      mutableQuestionList.slice(0, selectedIndex)
      .concat(mutableQuestionList.slice(selectedIndex + 1))
  }

  return result
}
