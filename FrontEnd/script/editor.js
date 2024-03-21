//Déclaration fonction fetch pour récupérer works dans modal
async function fetchData() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

//Création fonction pour vider la gallerie de la modale
const modalGallery = document.querySelector('.modalGallery');
function resetGallery (){
    modalGallery.innerHTML = ""
}

//Création fonction dans mode Editeur a déstination du fichier script
export function editorMode () {


    //Modification du HTML / CSS en version admin
    const userLogged = window.localStorage.getItem('token');
    if(userLogged){

        //Ajout barre mode éditeur
        const headBar = document.querySelector('.loggedUserHeadBar');
        headBar.style.display ='flex';

        //Suppression filtres
        const filterContainer = document.querySelector('.filter-container');
        filterContainer.style.display = "none";

        //Changement text login en logout
        const logOutLink = document.getElementById('logLink');
        logOutLink.innerText ="logout";
        logOutLink.href = ""

        //Ajout bouton modifier
        const btnOpen = document.querySelector('.btnOpen')
        btnOpen.classList.remove("hidden")
    }

    //Création de la fonction Logout
    const logOutLink = document.getElementById('logLink');

    logOutLink.addEventListener('click', logout);
    //Lancement de la fonction logout avec redirection sur l'index.HTML et suppresion du Token
    function logout (){
        window.localStorage.removeItem('token')
        location.reload("index.html");
    }
}




//Fonction ouverture modale 1 et ajout de l'overlay
const overlay = document.querySelector('.overlay')
const modalContainer = document.querySelector('.modal-container')

export const openModal = function () {
    overlay.classList.remove('hidden')
    modalContainer.classList.remove('hidden')
    modalContainer.setAttribute('display', 'flex')
}

//Fonction fermeture modale
export const closeModal = function () {
    overlay.classList.add('hidden')
    modalContainer.classList.add('hidden')
    modalContainer.removeAttribute('display', 'flex')
}

//Création fonction affichage des works dans la modale Ajout photo à destination du fichier script
export function generateWork() {
    fetchData()
    .then(data => {
        // Vidage de l'affichage des projets
        resetGallery();

        //Découpage du tableau "data" en "work" individuels
        //Affichage de l'ensemble des "work" si bouton all, sinon affichage de la categoryID qui correspond au bouton
        data.forEach(work => {
            const worksId = work.id
                const modalGallery = document.querySelector('.modalGallery')
                const figure = document.createElement('figure');
                figure.classList.add(`figure-${worksId}`);
                //Création des balises <img> et <figcaption>
                const imageWork = document.createElement('img');
                imageWork.src = work.imageUrl;
                imageWork.alt = work.title
                const trashIcon = document.createElement("div")
                trashIcon.classList.add("trash-icon")
                trashIcon.innerHTML= `<i class="fa-solid fa-trash-can" id="${work.id}"></i>`
                // Affichage des "work" séléctionné en les rattachant à la balise <div> du HTML
                modalGallery.appendChild(figure);
                figure.appendChild(imageWork);
                figure.appendChild(trashIcon); 

                trashIcon.addEventListener('click', (event) => {
                    deleteWorks(event, worksId)
                });
            });
        });
    }
                
              



//Fonction ouverture modale 2 sur click 'Ajouter une photo'
const addContentModal = document.querySelector('.addContentModal')

export const openModal2 = function () {
    modalContainer.classList.remove('display','flex')
    modalContainer.classList.add('hidden')
    addContentModal.classList.remove('hidden')
    addContentModal.classList.add('display','flex')
    resetModal2();
} 

//Fonction fermeture modale 2
export const closeModal2 = function () {
    overlay.classList.add('hidden')
    addContentModal.classList.add('hidden')
    addContentModal.removeAttribute('display', 'flex')
    resetModal2();
}

//Fonction retour sur la modale 1
export const returnModal1 = function () {
    resetModal2();
    closeModal2();
    openModal();
}


//Fonction suppression travaux
async function deleteWorks(event, worksId) {
   let monToken = window.localStorage.getItem('token');
    const deleteConfirmation = confirm("Souhaitez-vous vraiment supprimer ce projet ?")
    // Si confirmation :
    if (deleteConfirmation) {
      try {
        const deleteFetch = await fetch(`http://localhost:5678/api/works/${worksId}`,
          {
            method: "DELETE",
            headers: {Authorization: `Bearer ${monToken}`,
            },
          }
        );
        // Si suppresion ok
        if (deleteFetch.ok) {
          document.querySelectorAll(`.figure-${worksId}`)
          .forEach((figure) => figure.remove());
          event.preventDefault();
          console.log("Travail supprimé");
        } else {
          console.error(
            "Erreur lors de la suppression."
          );
        }
      } catch (error) {
        alert('Suppression impossible, une erreur est survenue')
      }
  }
}



//Ajout de photo par la modale 
export function choosePhoto () {
    document.getElementById('fileInput').addEventListener('change', () => {
      let file = fileInput.files[0];

      //Vérfication si fichier sélectionné est conforme
      let maxSize = 4 * 1024 * 1024;
      let allowedFormats = ['image/jpg','image/jpeg','image/png'];
      if(file.size <= maxSize && allowedFormats.includes(file.type)) {
        //Création du FileReader pour lire le nouveau ficher
        const fileReader = new FileReader();
        //Lecture et traitement du nouveau fichier
        fileReader.onload = () => { 
          const imagePreview = document.querySelector('.imagePreview')
          const iconAddPic = document.querySelector('.fa-image')
          const labelInputFile = document.querySelector('.labelFileInput')
          const textInputFile = document.querySelector('.addPicContainer p')
          //Affichage du nouveau fichier
          iconAddPic.style.display = 'none';
          labelInputFile.style.display = 'none';
          textInputFile.style.display = 'none';
          
          imagePreview.src = fileReader.result
          imagePreview.style.display = 'flex';
        }
        fileReader.readAsDataURL(file)

        //Message d'erreur si le taille de la photo ne correspond pas 
      } else if (file.size > maxSize){
        alert("L'image est trop volumineuse")
        //Message d'erreur si le format de la photo ne correspond pas
      } else {
        alert("Le format du projet ne correspond pas !")
        console("Le format du projet ne correspond pas !")
      };
    });
}



export function postNewFile () {
        const btnValidatePic = document.querySelector('.btnValidatePic')
        const fileInput = document.getElementById('fileInput')
        const titleInput = document.getElementById('title')
        const categoryInput = document.getElementById('category');
        let monToken = window.localStorage.getItem('token');

        //Ajout événement au click du bouton valider
        btnValidatePic.addEventListener('click', async (event) => {
          event.preventDefault();
          if (fileInput.value === "" || titleInput.value.trim() === "" || categoryInput.value === "") {
            alert("Il semblerait que certaines informations soient manquantes")
          } else { 
            const postConfirmation = confirm("Voulez-vous importer votre projet ?")
          //Si le bouton "oui" est cliqué :
          if(postConfirmation) {
            const formData = new FormData ();
              //Récupération de l'ID catégory
              const categoryId = categoryInput.options[categoryInput.selectedIndex].id;
              formData.append('category', categoryId);
              formData.append('image', fileInput.files[0]);
              formData.append('title', titleInput.value);
            const response = await fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${monToken}`,
                },
              body: formData,
            });
              if (response.ok) {
                console.log(titleInput.value, " ajouté !")
                const newWork = await response.json();
                 // Remise à zero de la modale d'ajout de fichier
                resetModal2();
                //Retour modal1 pour vue gallery
                returnModal1();
                //Appel de la fonction d'ajout des nouveaux fichiers à la gallery modal
                addNewWorkToModal(newWork);
                //Appel de la fonction d'ajout des nouveaux fichiers à la gallery du site
                addNeworkToIndex(newWork);
              };
            };
          };
        });
      }

//Fonction permettant de vider la modale N°2 pour l'ajout de photo à la fermeture de la modale ou au retour de la modale gallery
function resetModal2() {
  const imagePreview = document.querySelector('.imagePreview')
  const iconAddPic = document.querySelector('.fa-image')
  const labelInputFile = document.querySelector('.labelFileInput')
  const textInputFile = document.querySelector('.addPicContainer p')
  const titleForm = document.getElementById('title');
  const categoryForm = document.getElementById('category');

  imagePreview.style.display = 'none'
  titleForm.value = ""
  categoryForm.value = ""

  iconAddPic.style.display = 'flex';
  labelInputFile.style.display = 'flex';
  textInputFile.style.display = 'flex';

  const validateBtn = document.querySelector('.btnValidatePic');
  validateBtn.disabled = true 
  validateBtn.style.background = "#A7A7A7";
  validateBtn.style.cursor = "default"
  
}


//Fonction d'ajout du nouveau fichier a la gallery modale
async function addNewWorkToModal (newWork) {
      const newWorkId = newWork.id
      const modalGallery = document.querySelector('.modalGallery')
      //Création balise <figure>
      const figure = document.createElement ('figure')
      figure.classList.add (`figure-${newWork.id}`);
      //Création balise <img>
      const imageNewWork = document.createElement('img');
      imageNewWork.src = newWork.imageUrl;
      imageNewWork.alt = newWork.title;
      //Création balise <i>
      const trashIcon = document.createElement("div");
      trashIcon.classList.add("trash-icon");
      trashIcon.innerHTML= `<i class="fa-solid fa-trash-can" id="${newWork.id}"></i>`;
      // Affichage des "work" séléctionné en les rattachant à la balise <div> du HTML
      modalGallery.appendChild(figure);
      figure.appendChild(imageNewWork);
      figure.appendChild(trashIcon);

      trashIcon.addEventListener('click', async (event) => {
        deleteWorks(event, newWorkId)
  });
}

async function addNeworkToIndex(newWork) {
      const gallery = document.querySelector('.gallery')
      //Création balise <figure>
      const figure = document.createElement ('figure')
      figure.classList.add (`figure-${newWork.id}`);
      //Création balise <img> et <figcaption>
      const imageNewWork = document.createElement('img');
      imageNewWork.src = newWork.imageUrl;
      imageNewWork.alt = newWork.title;
      const figCaption = document.createElement('figcaption');
      figCaption.innerText = newWork.title;
      // Affichage des "work" séléctionné en les rattachant à la balise <div> du HTML
      gallery.appendChild(figure);
      figure.appendChild(imageNewWork);
      figure.appendChild(figCaption);
}

            


      
    

                