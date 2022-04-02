const OPCollection = document.querySelector('#OP-Collection')
const OnePiece = "http://localhost:3000/OPCharacters"
const form = document.querySelector('#form-container')


const input = document.querySelector('#search-input')
let OPCharacters = [];

form.addEventListener('submit', function(event){
    event.preventDefault()
    const name = document.querySelector('#new-character').value
    const picture = document.querySelector('#new-image').value
    const squad = document.querySelector('#new-crew').value
     let createCharacter = {
         name: name,
         image: picture,
         crew: squad,
     }
     fetch(OnePiece,{
         method: 'POST',
         headers: {
             'Content-type': 'application/json',
             'Accept': 'application/json'
         },
         body: JSON.stringify(createCharacter)
     })
     .then(resp=> resp.json())
      cardContainer(createCharacter)
    form.reset()
      
})

function pirates(){
    fetch(OnePiece)
    .then(resp => resp.json())
    .then(data => {
        OPCharacters = data
        cardContainer()
    })
}
function cardContainer(){
    OPCharacters.forEach(pirate => {
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
            let element = document.querySelector('.card')
            e.stopPropagation()
            element.remove()
            
        })
    });
    
}


// function handleSearch(event){
//     const searchInput = event.target.value.toLowerCase()
//     const filterOnePiece = OPCharacters.filter(pirate =>{
//         return(
//             pirate.name.toLowerCase().includes(searchInput)
//         )
//     })
//     console.log(filterOnePiece)
// }



// input.addEventListener('keyup', function(e){
//     const searchInput = e.target.value 
//      debugger;
//     const filterOnePiece = OPCollection.filter(pirate =>{
//         return(
//             pirate.name.includes(searchInput)
            
//         ) 
//     })
//     pirates(filterOnePiece)
// })
// document.addEventListener('keyup', handleSearch)
document.addEventListener('DOMContentLoaded', pirates)