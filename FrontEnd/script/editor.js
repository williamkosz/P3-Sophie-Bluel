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
} 

//Fonction fermeture modale 2
export const closeModal2 = function () {
    overlay.classList.add('hidden')
    addContentModal.classList.add('hidden')
    addContentModal.removeAttribute('display', 'flex')
}

//Fonction retour sur la modale 1
export const returnModal1 = function () {
    addContentModal.classList.add('hidden')
    addContentModal.removeAttribute('display', 'flex')
    modalContainer.classList.remove('hidden')
    modalContainer.setAttribute('display', 'flex')
}


//Fonction suppression travaux
async function deleteWorks(event, worksId) {
   let monToken = window.localStorage.getItem('token');
    const deleteConfirmation = await Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer cette image ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    });
    // Si confirmation :
    if (deleteConfirmation.isConfirmed) {
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
        Swal.fire({
          icon: "error",
          title: "Suppression impossible",
          text: "Une erreur s'est produite",
        });
      }
  }
}





                