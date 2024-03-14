
import {editorMode} from "./editor.js";
import {openModal} from "./editor.js";
import {generateWork } from "./editor.js";
import {closeModal} from "./editor.js";
import {openModal2} from "./editor.js";
import {closeModal2} from "./editor.js";
import {returnModal1} from "./editor.js";

// Etape 1.1 Récupérer les travaux depuis le back-end
export async function fetchData() {
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

const btnOpen = document.querySelector('.btnOpen')
const btnClose = document.querySelector('.btnClose')
const btnAddmodale = document.querySelector('.btnAddmodale')
const overlay = document.querySelector('.overlay')
const btnClose2 = document.querySelector('.btnClose2')
const arrowReturn = document.querySelector('.arrowReturn')


//Gestion des évènements pour ouverture modale 1
btnOpen.addEventListener ('click', openModal);

//Ajout des works dans modale
generateWork();

//Gestion des évènements pour fermeture modale 1
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//Ouverture modale 2 au click sur bouton "Ajouter une photo"
btnAddmodale.addEventListener('click', openModal2)

//Gestion des évènements pour fermeture modale 2
btnClose2.addEventListener('click', closeModal2)
overlay.addEventListener('click', closeModal2);

//Gestion des évènements pour retour modale 1
arrowReturn.addEventListener('click', returnModal1)