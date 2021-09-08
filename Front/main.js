let furnitureList = "http://localhost:3000/api/furniture/"
document.querySelector("#apitest")
fetch(furnitureList).then(response => response.json())
    .then(furniture => {
        console.log(furniture)
        let sectionArticles = "<ul>"
        for (let furnitureObject of furniture) {
            sectionArticles += `<li>
            <a href="#" ><img id="#product" src="${furnitureObject.imageUrl}"></img></a>
            <div class=description--group>
            <p>${furnitureObject.name}</p>
            <p>${furnitureObject.price/1000 + "0 €"}</p>
            </li>`
        }
        sectionArticles += "</ul>"
        document.querySelector("#apitest").innerHTML = sectionArticles
    }).catch(erreur => alert("un problème est survenu"))


   