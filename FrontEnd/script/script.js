import {editorMode} from "./editor.js";

// Etape 1.1 Récupérer les travaux depuis le back-end
async function fetchData() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

// Création fonction pour reset de la section gallery
const gallery = document.querySelector('.gallery');
function resetGallery (){
    gallery.innerHTML = ""
}

//Etape 1.2 gestion du filtre des "works"
//Récupération des boutons de filtrage
const allButton = document.querySelector('.noFilter');
const objectButton = document.querySelector('.filter-objet');
const appartementButton = document.querySelector('.filter-appartement')
const hotelsButton = document.querySelector('.filter-hotel');

//Définition des évènements liés aux boutons
allButton.addEventListener('click' , () => {
    updateFilters("all");
})

objectButton.addEventListener('click' , () => {
    updateFilters(1);
})

appartementButton.addEventListener('click' , () => {
    updateFilters(2);
})

hotelsButton.addEventListener('click' , () => {
    updateFilters(3);
})


// Création fonction pour filtrage des projets en fonction des catégories
function updateFilters(category) {
    fetchData()
    .then(data => {
        // Vidage de l'affichage des projets
        resetGallery();

        //Découpage du tableau "data" en "work" individuels
        //Affichage de l'ensemble des "work" si bouton all, sinon affichage de la categoryID qui correspond au bouton
        data.forEach(work => {
            if(category === 'all' || work.categoryId === category) {
                const figure = document.createElement('figure');
                //Création des balises <img> et <figcaption>

                const imageWork = document.createElement('img');
                imageWork.src = work.imageUrl;
                imageWork.alt = work.title
                const figCaption = document.createElement('figcaption');
                figCaption.innerText = work.title;

                // Affichage des "work" séléctionné en les rattachant à la balise <div> du HTML
                gallery.appendChild(figure);
                figure.appendChild(imageWork);
                figure.appendChild(figCaption);
            }
        });
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
}

// Appel initial pour afficher tous les travaux
updateFilters('all');


// Appel fonction importée pour mode editeur
editorMode()




//Ajout de la modale

//Création de la modale