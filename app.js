// ===============================
// 🇫🇷 ISRAËL GAMES
// ===============================

// Variables générales
let jeuActuel = "";
let questionIndex = 0;
let score = 0;

// ===============================
// 🔊 SYSTÈME DE SONS
// ===============================

const sons = {
    click: new Audio("sounds/click.mp3"),
    correct: new Audio("sounds/correct.mp3"),
    wrong: new Audio("sounds/wrong.mp3"),
    victory: new Audio("sounds/victory.mp3")
};

function jouerSon(nom) {
    if (sons[nom]) {
        sons[nom].currentTime = 0;
        sons[nom].play().catch(() => {});
    }
}

// Meilleur score sauvegardé sur le téléphone
let meilleurScore = localStorage.getItem("meilleurScore") || 0;

document.getElementById("meilleurScore").textContent = meilleurScore;


// ===============================
// 🧠 QUIZ GÉNÉRAL
// ===============================

const quiz = [
    {
        question: "Quel est le créateur d'Israël Games ?",
        reponses: [
            "Israël Zongwe",
            "Ernest",
            "Sijafurahi Zongwe",
            "Un professeur"
        ],
        bonne: "Israël Zongwe"
    },

    {
        question: "Quel langage permet de créer la structure d'une page web ?",
        reponses: [
            "HTML",
            "Python",
            "Java",
            "C++"
        ],
        bonne: "HTML"
    },

    {
        question: "Quel symbole est souvent utilisé pour représenter un jeu vidéo ?",
        reponses: [
            "🎮",
            "📚",
            "🍎",
            "🚗"
        ],
        bonne: "🎮"
    },

    {
        question: "Que signifie APK ?",
        reponses: [
            "Android Package Kit",
            "Application Programming Keyboard",
            "Android Phone Key",
            "Advanced Program Kit"
        ],
        bonne: "Android Package Kit"
    }
];


// ===============================
// 🔢 DÉFI MATHS
// ===============================

const maths = [
    {
        question: "Combien font 8 + 7 ?",
        reponses: [
            "14",
            "15",
            "16",
            "17"
        ],
        bonne: "15"
    },

    {
        question: "Combien font 12 × 3 ?",
        reponses: [
            "24",
            "30",
            "36",
            "42"
        ],
        bonne: "36"
    },

    {
        question: "Combien font 50 - 18 ?",
        reponses: [
            "22",
            "28",
            "32",
            "38"
        ],
        bonne: "32"
    },

    {
        question: "Combien font 81 ÷ 9 ?",
        reponses: [
            "7",
            "8",
            "9",
            "10"
        ],
        bonne: "9"
    }
];


// ===============================
// ⚽ FOOTBALL QUIZ
// ===============================

const football = [
    {
        question: "Combien de joueurs une équipe de football aligne-t-elle normalement sur le terrain ?",
        reponses: [
            "9",
            "10",
            "11",
            "12"
        ],
        bonne: "11"
    },

    {
        question: "Quelle partie du corps est principalement utilisée par un gardien pour arrêter le ballon dans sa surface ?",
        reponses: [
            "Les mains",
            "Les oreilles",
            "Les épaules uniquement",
            "La tête uniquement"
        ],
        bonne: "Les mains"
    },

    {
        question: "Combien de minutes dure normalement un match de football, sans compter les arrêts de jeu ?",
        reponses: [
            "60 minutes",
            "75 minutes",
            "90 minutes",
            "120 minutes"
        ],
        bonne: "90 minutes"
    },

    {
        question: "Quel objet les joueurs essaient-ils principalement de faire entrer dans le but ?",
        reponses: [
            "Un ballon",
            "Une chaussure",
            "Une balle de tennis",
            "Un disque"
        ],
        bonne: "Un ballon"
    }
];


// ===============================
// 🎮 OUVRIR UN JEU
// ===============================

function ouvrirJeu(type) {

    jouerSon("click");

    jeuActuel = type;
    questionIndex = 0;
    score = 0;

    document.getElementById("accueil").classList.add("cache");
    document.getElementById("jeu").classList.remove("cache");

    document.getElementById("score").textContent = score;

    if (type === "quiz") {
        document.getElementById("titreJeu").textContent = "🧠 Quiz";
    }

    if (type === "maths") {
        document.getElementById("titreJeu").textContent = "🔢 Défi Maths";
    }

    if (type === "football") {
        document.getElementById("titreJeu").textContent = "⚽ Football Quiz";
    }

    afficherQuestion();
}


// ===============================
// 📖 AFFICHER UNE QUESTION
// ===============================

function afficherQuestion() {

    let questions;

    if (jeuActuel === "quiz") {
        questions = quiz;
    }

    if (jeuActuel === "maths") {
        questions = maths;
    }

    if (jeuActuel === "football") {
        questions = football;
    }

    if (questionIndex >= questions.length) {
        terminerJeu();
        return;
    }

    const questionActuelle = questions[questionIndex];

    document.getElementById("question").textContent =
        questionActuelle.question;

    const zoneReponses = document.getElementById("reponses");

    zoneReponses.innerHTML = "";

    document.getElementById("resultat").textContent = "";

    document.getElementById("suivant").classList.add("cache");


    questionActuelle.reponses.forEach(function(reponse) {

        const bouton = document.createElement("button");

        bouton.textContent = reponse;

        bouton.onclick = function() {
            verifierReponse(reponse, questionActuelle.bonne);
        };

        zoneReponses.appendChild(bouton);
    });
}


// ===============================
// ✅ VÉRIFIER LA RÉPONSE
// ===============================

function verifierReponse(reponse, bonneReponse) {

    const boutons =
        document.querySelectorAll("#reponses button");

    boutons.forEach(function(bouton) {
        bouton.disabled = true;
    });


    if (reponse === bonneReponse) {

        jouerSon("correct");

        score += 10;

        document.getElementById("resultat").textContent =
            "✅ Bonne réponse ! +10 points";

    } else {

        jouerSon("wrong");

        document.getElementById("resultat").textContent =
            "❌ Mauvaise réponse. La bonne réponse était : " +
            bonneReponse;
    }

    document.getElementById("score").textContent = score;

    document.getElementById("suivant").classList.remove("cache");
}


// ===============================
// ➡️ QUESTION SUIVANTE
// ===============================

function questionSuivante() {

    jouerSon("click");

    questionIndex++;

    afficherQuestion();
}


// ===============================
// 🏆 FIN DU JEU
// ===============================

function terminerJeu() {

    jouerSon("victory");

    document.getElementById("question").textContent =
        "🎉 Partie terminée !";

    document.getElementById("reponses").innerHTML = "";

    document.getElementById("resultat").textContent =
        "Votre score : " + score + " points";


    if (score > meilleurScore) {

        meilleurScore = score;

        localStorage.setItem(
            "meilleurScore",
            meilleurScore
        );

        document.getElementById("meilleurScore").textContent =
            meilleurScore;

        document.getElementById("resultat").textContent +=
            " 🏆 Nouveau meilleur score !";
    }

    document.getElementById("suivant").textContent =
        "🔄 Rejouer";

    document.getElementById("suivant").classList.remove("cache");

    document.getElementById("suivant").onclick = function() {
        ouvrirJeu(jeuActuel);
    };
}


// ===============================
// 🏠 RETOUR À L'ACCUEIL
// ===============================

function retourAccueil() {

    jouerSon("click");

    document.getElementById("jeu").classList.add("cache");

    document.getElementById("accueil").classList.remove("cache");

    document.getElementById("suivant").textContent =
        "Question suivante →";

    document.getElementById("suivant").onclick =
        questionSuivante;
}