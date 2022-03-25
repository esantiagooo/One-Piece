const OPCollection = document.querySelector('#OP-Collection')
const OnePiece = "http://localhost:3000/OPCharacters"

const input = document.querySelector('#search-input')
let OPCharacters = [];

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

        let image = document.createElement('img')
        image.src = pirate.image
        image.className = 'OP-Characters-avatar'
        div.append(image)
    });
    
}
function handleSearch(event){
    const searchInput = event.target.value
    const filterOnePiece = OPCharacters.filter(pirate =>{
        return(
            pirate.name.toLowerCase().includes(searchInput)
        )
    })
    console.log(filterOnePiece)
}


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
document.addEventListener('click', handleSearch)
document.addEventListener('DOMContentLoaded', pirates)