
// Exercice d’authentification simplifiée
const user = { id: '1', nom:'VEGBA', prenom: 'Lux' };

function generateToken(user){
    if(!user){
        return "Cet uutilisateurs n'existe pas";
    }
    let myCrypt = btoa(JSON.stringify(user));
    return  myCrypt;
}

function verifyToken(token){

    if(!token) {
        return " token vide ";
    }
    let myDecrypt = atob(token);
    return JSON.parse( myDecrypt );
}



//Exercice de filtrage d’un tableau

const  tab = [ "voiture" , "balon", "chaussures"]
function filtrage(tab){
    if (tab.length === 0){
        return "veuillez ajoutez un tableau de données"
    }
    filtreResult = tab.filter(word => word.includes('a'));
}

