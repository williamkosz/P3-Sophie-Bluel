// Etape 1.1 : Récupération des travaux depuis le back-end

const gallery = document.querySelector('.gallery');
// Création fonction pour reset de la section gallery
function resetGallery (){
    gallery.innerHTML = ""
}

resetGallery ();

// Appel à l'API pour récuperer les travaux
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();


function genererProjets (projets) {
    for(let i = 0; i < projets.length; i++){
        const works = projets [i];
        // Création de la section <figure>
        const figure = document.createElement('figure');
        //Création des balises <img> et <figcaption>
        const imageWorks = document.createElement('img');
        imageWorks.src = works.imageUrl;
        const figCaption = document.createElement('figcaption');
        figCaption.innerText = works.title;

        // Rattachement des balises à leur section
        gallery.appendChild(figure);
        figure.appendChild(imageWorks);
        figure.appendChild(figCaption);
    }
}

genererProjets(projets);

//Gestion des boutons pour filtre des projets

const btnNoFilter = document.querySelector('.noFilter');
const filterObject = document.querySelector('.filter-objet');
const filterAppartement = document.querySelector('.filter-appartement')
const filterHotel = document.querySelector('.filter-hotel');

//Gestion du bouton TOUS
btnNoFilter.addEventListener('click', function(){
    const allWorks = projets.filter(function(work){
        return work.categoryId 
    });
    resetGallery()
    genererProjets(allWorks)
})

//Gestion du bouton Objets
filterObject.addEventListener('click', function(){
    const worksObject = projets.filter(function(work){
        return work.categoryId === 1 
    });
    resetGallery()
    genererProjets(worksObject)
})

//Gestion du bouton Appartements
filterAppartement.addEventListener('click', function(){
    const worksAppartement = projets.filter(function(work){
        return work.categoryId === 2
    });
    resetGallery()
    genererProjets(worksAppartement)
})

//Gestion du bouton Hôtels et restaurants
filterHotel.addEventListener('click', function(){
    const worksHotel = projets.filter(function(work){
        return work.categoryId === 3
    });
    resetGallery()
    genererProjets(worksHotel)
})