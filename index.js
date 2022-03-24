const OPCharacters = document.querySelector('#OP-Characters')
const OnePiece = "http://localhost:3000/OPCharacters"
console.log(OPCharacters)

let OPCollection;

function pirates(){
    fetch(OnePiece)
    .then(resp => resp.json())
    .then(data => {
        OPCollection = data
        cardContainer()
    })
}
function cardContainer(){
    OPCollection.forEach(pirate => {
        console.log(pirate)
        let div = document.createElement('div')
        div.className = 'card'
        OPCharacters.append(div)

        let header = document.createElement('h2')
        header.innerHTML = pirate.name
        div.append(header)

        let image = document.createElement('img')
        image.src = pirate.image
        image.className = 'OP-Characters-avatar'
        div.append(image)
    });
}
document.addEventListener('DOMContentLoaded', pirates)