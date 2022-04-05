const OPCollection = document.querySelector('#OP-Collection')
const OnePiece = "http://localhost:3000/OPCharacters"
const form = document.querySelector('#form-container')
const searchInput = document.querySelector('#search-input')
let OPCharacters = [];

searchInput.addEventListener('input', function(e){
    let value = e.target.value.toLowerCase()
    let filteredCharacters = OPCharacters.filter(pirate => 
        pirate.name.toLowerCase().includes(value) ||
        pirate.crew.toLowerCase().includes(value)
    )

    OPCollection.innerHTML = ""
    cardContainer(filteredCharacters)
})

form.addEventListener('submit', function(event){
    event.preventDefault()
    const name = document.querySelector('#new-character').value
    const image = document.querySelector('#new-image').value
    const crew = document.querySelector('#new-crew').value
     const  createCharacter = {
          name,
          image,
          crew,
     }
     fetch(OnePiece,{
         method: 'POST',
         headers: {
             'Content-type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify(createCharacter)
     })
     .then(resp => resp.json())
     .then(newCharacter => cardContainer([newCharacter]))
    //  .then(cardContainer(createCharacter))
      
    form.reset()
      
})

function pirates(){
    fetch(OnePiece)
    .then(resp => resp.json())
    .then(data => {
        OPCharacters = data
        cardContainer(OPCharacters)
    })
}
function cardContainer(allcharacters){
     allcharacters.forEach(pirate => {
        let div = document.createElement('div')
        div.className = 'card'
        OPCollection.append(div)

        let header = document.createElement('h2')
        header.innerHTML = pirate.name
        div.append(header)

        let crew = document.createElement('h3')
        crew.innerHTML = pirate.crew
        div.append(crew)

        let image = document.createElement('img')
        image.src = pirate.image
        image.className = 'OP-Characters-avatar'
        div.append(image)

        let button = document.createElement('button')
        button.className = 'delete-btn'
        button.innerText = 'Delete'
        button.id = pirate.id
        div.append(button)
        
        button.addEventListener('click', function(e){
            let element = document.getElementById(e.target.id).parentElement
            e.stopPropagation()
            element.remove()
            deleteCharacter(pirate.id)
            
        })
    });
    
}
function deleteCharacter(id){
    fetch(`${OnePiece}/${id}` ,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(resp => resp.json())
    .then(pirate => console.log(pirate))
}

document.addEventListener('DOMContentLoaded', pirates)