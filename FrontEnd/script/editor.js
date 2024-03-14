
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