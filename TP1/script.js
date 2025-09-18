// =================
// Partie 1
// =================

// Ex 1
var a = 1;
let b = "TEST";
const c = true;

{
    var a = 55;
    let b = "xyz";
    console.error("On ne peut pas modifier la valeur d'un const")
    console.log("A l'interieur du Bloc : var a = ", a, ", let b = ", b)
}

console.log("Script global: var a = ", a, ", let b = ", b, ", const c = ", c);


// Ex 2
const somme = (x, y) => x + y;
const somme2 = (x, y) => {return x+y}
console.log("somme(2, 3) = ", somme(2,3));

// Ex 3
const user = { name: "Noor", age: 10, city: "Tunis" };
const user_name = user.name
const user_age = user.age
console.log("Méthode 1: ", user_name, user_age)
const { name , age } = user
console.log("Méthode 2: ", name, age)

//Ex 4
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const fusion = [...arr1, ...arr2];
console.log("Fusion: ", fusion);

const original = { is_football_fan: true, favorite_team: "Barça", stadium_capacity: 90000};
const copie = { ...original, stadium_capacity: 110000};
console.log("original: ", original, "\nCopie Modifiée: ", copie)


// =================
// Partie 2
// =================
// Ex 5
const livre = {
    titre: "Harry potter and the goblet of fire",
    auteur: "Jk Rowling",
    annee: 2002,
    getInfo: function() {
        return `${this.titre}, écrit par ${this.auteur} en ${this.annee}.`;
    }
};
console.log(livre.getInfo());

// Ex 6
class Etudiant {
    constructor(nom, note){
        this.nom = nom;
        this.note = note;
    }
    getMention(){
        if(this.note < 10) return "A échoué";
        else if(this.note < 14) return "Passable";
        else if(this.note < 16) return "Bien";
        else return "Très bien";
    }
}
const etudiant1 = new Etudiant("Ahmed", 9);
console.log(`${etudiant1.nom} a la mention: ${etudiant1.getMention()}`);
const etudiant2 = new Etudiant("Mohamed", 13);
console.log(`${etudiant2.nom} a la mention: ${etudiant2.getMention()}`);
const etudiant3 = new Etudiant("Ali", 15);
console.log(`${etudiant3.nom} a la mention: ${etudiant3.getMention()}`);  

// Ex 7
const notes = [12, 5, 17, 9, 20];
moyenne = notes.reduce((acc, val) => acc + val, 0) / notes.length; //*
console.log("Moyenne: ", moyenne);
const notesOrdonnees = notes.sort((a, b) => b - a); //const notesOrdonnees = [...notes].sort((a, b) => a - b);
console.log("Notes ordonnées (tri décroissant): ", notesOrdonnees);
const notesSup10 = notes.filter(note => note > 10);
console.log("Notes supérieures à 10: ", notesSup10);

// =================
// Partie 3
// =================
// Ex 8
const wait = ms => new Promise(res => setTimeout(res, ms));
async function simulerTelechargement() {
    console.log("Debut");
    await wait(2000);
    console.log("Fin");
}
simulerTelechargement();

// Ex 9
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        console.log("Les 5 premiers posts: ");
        data.slice(0, 5).forEach(post => { console.log(post.title, '\n')})
    }catch (error) {
        console.error("Erreur lors de la récupération des données: ", error);
    }
}
fetchData();