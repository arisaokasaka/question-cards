document.body.onload = mounted

async function mounted () {
  await addElements()
  addClickEvent()
}

async function addElements () {
  const wholeContainer = document.getElementById("whole-container")
  const randomizedQuestions = await randomizedQuestionList()

  for (let i = 1; i <= 32; i++) {
    
    const displayedParagraph = document.createElement("p")
    displayedParagraph.appendChild(document.createTextNode("🧡"))
    
    const hiddenParagraph = document.createElement("p")
    hiddenParagraph.style = "display: none;"
    hiddenParagraph.appendChild(document.createTextNode(randomizedQuestions[i - 1]))
    
    const newDiv = document.createElement("div")
    newDiv.className = "tile"
    newDiv.appendChild(displayedParagraph)
    newDiv.appendChild(hiddenParagraph)

    wholeContainer.appendChild(newDiv)
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

  for(let i = 0; i < resultLength - 1; i++) {
    const selectedIndex = (function() {
      return Math.floor(Math.random() * mutableQuestionList.length - 1)
    } ())

    result.push(mutableQuestionList[selectedIndex])

    mutableQuestionList =
      mutableQuestionList.slice(0, selectedIndex)
      .concat(mutableQuestionList.slice(selectedIndex + 1))
  }

  return result
}

function addClickEvent () {
  const tiles = document.getElementsByClassName('tile')
  for(let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener('click', () => {
      console.log('clicked');
    }, false)
  }
}
