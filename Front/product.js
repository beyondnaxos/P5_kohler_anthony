const furnitureIndividual = window.location.search
console.log(furnitureIndividual)
const urlParams = new URLSearchParams(furnitureIndividual)
// const product = urlParams.get('product')
console.log(urlParams)






// const furnitureID = 'http://localhost:3000/api/furniture/:_id'
// document.querySelector('#apitest')
// fetch(furnitureID).then(response => response.json())
//   .then(furniture => {
//     console.log(furniture)
//     let sectionArticles = '<ul>'
//     sectionArticles += displayProduct(furnitureID)
//     sectionArticles += '</ul>'
//     document.querySelector('#apitest').innerHTML = sectionArticles
//   }).catch(erreur => alert('un problème est survenu'))
// function displayProduct (product) {
//   console.log(product)
//   return `<li>
//        <a href="product.html?id=${product._id}" ><img id="#product" src="${product.imageUrl}"></img></a>
//        <div class=description--group>
//        <p>${product.name}</p>
//        <p>${product.price / 1000 + '0 €'}</p>
//        </li>`
// }