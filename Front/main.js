const lienAPI = 'http://localhost:3000/api/furniture/'
document.querySelector('#apitest')
fetch(lienAPI).then(response => response.json())
  .then(furniture => {
    console.log(furniture)
    let sectionArticles = '<ul>'
    for (const furnitureObject of furniture) {
      sectionArticles += displayProduct(furnitureObject)
    }
    sectionArticles += '</ul>'
    document.querySelector('#apitest').innerHTML = sectionArticles
  }).catch(erreur => alert('un problème est survenu'))

function displayProduct (product) {
  console.log(product)
  return `<li>
    <a href="product.html?id=${product._id}" ><img id="#product" src="${product.imageUrl}"></img></a>
    <div class=description--group>
    <p>${product.name}</p>
    <p>${product.price / 1000 + '0 €'}</p>
    </li>`
}
