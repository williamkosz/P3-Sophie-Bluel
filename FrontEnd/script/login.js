// Informations de connexion : 
//Mail : sophie.bluel@test.tld
//MDP : S0phie


const form = document.querySelector('.formLogin');
const errorMessage = document.querySelector('.errorMessage');


form.addEventListener('submit', (event) => {
    event.preventDefault(); // Stop l'action par défaut


//Récupération des valeurs pour charge utile fetch('')
const emailInput = document.getElementById('email').value;
const passwordInput = document.getElementById('password').value;

// Création de des données pour charge utile
let dataForm = {
    email : emailInput,
    password : passwordInput
}

// Création de la charge utile au format JSON
const chargeUtile = JSON.stringify(dataForm)

//Appel de la fonction FETCH
fetch ('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: chargeUtile
    })
    .then (response => response.json())
    .then (data => {
        if(data.token){
            window.localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        } else {
            errorMessage.style.display = 'block';
            console.log("Erreur dans l'identifiant ou le mot de passe");
        }
    });
});

