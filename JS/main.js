// Stock l'url de l'api dans la variable lienAPI
const lienAPI = 'http://localhost:3000/api/furniture/'
// Selectionne l'ID apitest qui correspond au container dans lequel sera afficher la réponse du serveur
document.querySelector('#apitest')
// Va chercher l'Api , stock le résultat dans réponse puis converti les données au format JSPON
fetch(lienAPI).then(response => response.json())
  .then(furniture => {
    console.log(furniture)
    // création du code html dynamique qui affichera à l'aide d'une boucle tous les produits de l'API
    let sectionArticles = '<ul>'
    for (const furnitureObject of furniture) {
      sectionArticles += displayProduct(furnitureObject)
    }
    sectionArticles += '</ul>'
    document.querySelector('#apitest').innerHTML = sectionArticles
  }).catch(erreur => alert('un problème est survenu'))

// Création de la fonction displayProduct qui va permettre de retourner la liste çi dessous à l'interieur de la boucle
function displayProduct (product) {
  console.log(product)
  return `<li class="indexList">
    <a href="product.html?id=${product._id}" id="urlProduit" ><img class="imgList" src="${product.imageUrl}"></img></a>
    <div class=description--groupList>
    <p class="pTitleList">${product.name}</p>
    <p class="pQuoteList">${product.price / 100 + '.00 €'}</p>
    </li>`
}
