
import {editorMode} from "./editor.js";
import {openModal} from "./editor.js";
import {generateWork } from "./editor.js";
import {closeModal} from "./editor.js";
import {openModal2} from "./editor.js";
import {closeModal2} from "./editor.js";
import {returnModal1} from "./editor.js";
import {choosePhoto} from "./editor.js";
import {postNewFile} from "./editor.js";


// Etape 1.1 Récupérer les travaux depuis le back-end
export async function fetchData() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}



//Récupération des catégories pour création des boutons dynamique
async function fetchCategory () {
    const response = await fetch ('http://localhost:5678/api/categories');
    return await response.json();
}



// Création fonction pour reset de la section gallery
const gallery = document.querySelector('.gallery');
function resetGallery (){
    gallery.innerHTML = ""
}



// Création fonction pour filtrage des projets en fonction des catégories
function updateGallery(category) {
    fetchData()
    .then(data => {
        // Vidage de l'affichage des projets
        resetGallery();
        //Découpage du tableau "data" en "work" individuels
        //Affichage de l'ensemble des "work" si bouton all, sinon affichage de la categoryID qui correspond au bouton
        data.forEach(work => {
            const worksId = work.id;
            if(category === 'all' || work.categoryId === category) {
                const figure = document.createElement('figure');
                figure.classList.add(`figure-${worksId}`);
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
updateGallery('all');



//Etape 1.2 gestion du filtre des "works"
function createFilterMenu (){
    const filterContainer = document.querySelector('.filter-container');
    // Création du bouton "Tous" en dehors de la boucle
    const filterButtonAll = document.createElement('button');
    filterButtonAll.classList.add("filter-button");
    filterButtonAll.textContent = "Tous";
    filterButtonAll.value = "all";
    filterContainer.appendChild(filterButtonAll);

    fetchCategory()
        .then(categories => {
            categories.forEach(category => {
                //Création boutons pour chaque catégorie
                const filterButton = document.createElement('button');
                //Ajout du style CSS
                filterButton.classList.add("filter-button");
                //Ajout du nom du bouton
                filterButton.textContent = category.name;
                //Ajout de son id correspondant à la catégorie
                filterButton.value = category.id;
                //Ajout des filtres à la div menu
                filterContainer.appendChild(filterButton); 
                //Appel fonction pour filtrage au click
                filterButton.addEventListener('click', function (){
                    const categoryId = category.id;
                    if (categoryId === 'all') {
                        // Si l'ID est "all", afficher toutes les catégories
                        updateGallery('all');
                        // Ajouter ici le code pour afficher toutes les catégories
                    } else {
                        // Sinon, appeler la fonction updateFilters avec l'ID de la catégorie
                        updateGallery(categoryId);
                    }
                });
            });
        });
    // Ajout du gestionnaire d'événements pour le bouton "Tous" en dehors de la boucle
    filterButtonAll.addEventListener('click', function() {
        // Lorsque le bouton "Tous" est cliqué,  appel de la fonction updateFilters avec 'all'
        updateGallery('all');
    });
}



//Création du menu filtre 
createFilterMenu();



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


//Création dela fonction pour fonctionnement du bouton de validation d'ajout de photo
const disabledValidateBtn = function () {
    const photoForm = document.getElementById('fileInput');
    const titleForm = document.getElementById('title');
    const categoryForm = document.getElementById('category');
    const validateBtn = document.querySelector('.btnValidatePic');
  
    // Vérification des champs, s'ils sont vides ou non
    if (photoForm.value.trim() === "" || titleForm.value.trim() === "" || categoryForm.value.trim() === "") {
      validateBtn.disabled = true 
      validateBtn.style.background = "#A7A7A7";
      validateBtn.style.cursor = "default"
    } else {
      validateBtn.disabled = false; 
      validateBtn.style.background = "#1D6154";
      validateBtn.style.cursor = "pointer"
    }
  };
  
  // Ajout des écouteurs d'événements pour chaque champ de formulaire
  document.getElementById('fileInput').addEventListener('change', disabledValidateBtn);
  document.getElementById('title').addEventListener('change', disabledValidateBtn);
  document.getElementById('category').addEventListener('change', disabledValidateBtn);
  
  // Appel initial pour vérifier l'état des champs du formulaire lors du chargement de la page
  disabledValidateBtn();

  //Import du nouveau fichier avant de le poster
  choosePhoto();

  //Post du nouveau fichier
  postNewFile();

