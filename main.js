// Stock l'url de l'api dans la variable lienAPI
const lienAPI = 'http://localhost:3000/api/furniture/'
// Selectionne l'ID apitest
document.querySelector('#apitest')
// Va chercher l'Api , stocker dans réponse puis le transformer en objet JSON
fetch(lienAPI).then(response => response.json())
  // Les données du JSON sont transmises à furniture
  .then(furniture => {
    console.log(furniture)
    // Création de mise en forme de la variable sectionArticles
    let sectionArticles = '<ul>'
    // Création de la boucle pour afficher tous les produits
    for (const furnitureObject of furniture) {
      sectionArticles += displayProduct(furnitureObject)
    }
    sectionArticles += '</ul>'
    // innerHtml sectionArticles
    document.querySelector('#apitest').innerHTML = sectionArticles
  }).catch(erreur => alert('un problème est survenu'))

// Création de la fonction displayProduct qui va permettre de retourner la liste çi dessous à l'interieur de la boucle
function displayProduct (product) {
  console.log(product)
  return `<li>
    <a href="product.html?id=${product._id}" id="urlProduit" ><img id="#product" src="${product.imageUrl}"></img></a>
    <div class=description--group>
    <p>${product.name}</p>
    <p>${product.price / 1000 + '0 €'}</p>
    </li>`
}
