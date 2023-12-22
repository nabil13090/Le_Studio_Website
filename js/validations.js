// Code JavaScript pour la validation des champs et l'envoi des données du formulaire par e-mail.

// Sélection des éléments HTML :
// Ces lignes de code sélectionnent les éléments du formulaire HTML en utilisant les sélecteurs CSS. Les variables fnameInput, lnameInput, phoneInput, emailInput, subjectInput, et msgTextArea représentent respectivement les champs du prénom, du nom, du téléphone, de l'e-mail, du sujet, et du message.
const form = document.querySelector('form');
const fnameInput = document.querySelector('#fname');
const lnameInput = document.querySelector('#lname');
const phoneInput = document.querySelector('input[type=tel]');
const emailInput = document.querySelector('input[type=email]');
const subjectInput = document.querySelector('#subject');
const msgTextArea = document.querySelector('#message');

// Variables de validation et de valeur
// Ces variables sont utilisées pour stocker l'état de validation (true ou false) et les valeurs actuelles des champs du formulaire.
let fnameValid = false;
let lnameValid = false;
let phoneValid = false;
let emailValid = false;
let subjectValid = false;
let msgValid = false;

let fnameValue = "";
let lnameValue = "";
let phoneValue = "";
let emailValue = "";
let subjectValue = "";
let msgValue = "";

// Expressions régulières pour la validation (Regex) :
// Ces expressions régulières sont utilisées pour valider les champs correspondants du formulaire.
const UserRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/u;
const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PhoneNumberRegex = /^\+(?:\d{1,3})?\d{10}$/;
const SubjectRegex = /^[^<>{}$]{3,200}$/;
const MessageRegex = /^[^<>{}$]{24,}$/;

// Fonction addClass pour la gestion des classes CSS :
// Cette fonction prend un élément HTML, une expression régulière (Regex), la valeur actuelle du champ, et une variable de validation en paramètre. Elle ajoute ou supprime les classes CSS 'is-valid' et 'is-invalid' en fonction de la validation.
function addCLass(element, regex, value, valid) {
    if (regex.test(value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        valid = true;
    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        valid = false;
    }
}

// Écouteurs d'événements pour les champs du formulaire :
// Ces écouteurs d'événements surveillent les changements dans les champs du formulaire et utilisent la fonction addClass pour gérer les classes CSS en fonction de la validation.
lnameInput.addEventListener('input', (e) => {
    addCLass(lnameInput, UserRegex, e.target.value, lnameValid);
    if (lnameInput.classList.contains('is-valid')) {
        lnameValid = true;
        lnameValue = e.target.value;
    } else {
        lnameValid = false;
        lnameValue = "";
    }
});

fnameInput.addEventListener('input', (e) => {
    addCLass(fnameInput, UserRegex, e.target.value, fnameValid);
    if (fnameInput.classList.contains('is-valid')) {
        fnameValid = true;
        fnameValue = e.target.value;
    } else {
        fnameValid = false;
        fnameValue = "";
    }
});

phoneInput.addEventListener('input', (e) => {

    // Récupération de la valeur du champ de téléphone :
    // Lorsque l'utilisateur saisit quelque chose dans le champ de téléphone, cet événement est déclenché, et la valeur du champ est extraite de l'objet événement (e) et stockée dans la variable phoneNumber.
    let phoneNumber = e.target.value;

    // Suppression des espaces dans le numéro de téléphone :
    // Cette ligne de code utilise la méthode replace avec une expression régulière (/ /g) pour supprimer tous les espaces présents dans la chaîne de caractères du numéro de téléphone.
    phoneNumber = phoneNumber.replace(/ /g, '');

    // Remplacement du premier '0' par '+33' :
    // Cette ligne de code utilise à nouveau la méthode replace avec une expression régulière (/^0/) pour remplacer le premier '0' dans la chaîne de caractères du numéro de téléphone par '+33'. Cela suggère une conversion du format national (commençant par '0') vers le format international (commençant par '+33').
    phoneNumber = phoneNumber.replace(/^0/, '+33');

    // Validation du numéro de téléphone en appelant la fonction addClass :
    // Cette ligne de code appelle la fonction addClass avec les paramètres nécessaires. La fonction utilise l'expression régulière PhoneNumberRegex pour valider le numéro de téléphone et ajuste les classes CSS (is-valid ou is-invalid) en conséquence.
    addCLass(phoneInput, PhoneNumberRegex, phoneNumber, phoneValid);

    // Mise à jour des variables de validation et de valeur :
    // Ces lignes vérifient si la classe is-valid est présente sur l'élément phoneInput. Si c'est le cas, cela signifie que la validation a réussi. En conséquence, la variable phoneValid est définie sur true, et la valeur du numéro de téléphone (phoneValue) est mise à jour. Sinon, la variable phoneValid est définie sur false, et phoneValue est réinitialisée.
    if (phoneInput.classList.contains('is-valid')) {
        phoneValid = true;
        phoneValue = e.target.value;
    } else {
        phoneValid = false;
        phoneValue = "";
    }
})

emailInput.addEventListener('input', (e) => {
    addCLass(emailInput, EmailRegex, e.target.value, emailValid);
    if (emailInput.classList.contains('is-valid')) {
        emailValid = true;
        emailValue = e.target.value;
    } else {
        emailValid = false;
        emailValue = "";
    }
});

subjectInput.addEventListener('input', (e) => {
    addCLass(subjectInput, SubjectRegex, e.target.value, subjectValid);
    if (subjectInput.classList.contains('is-valid')) {
        subjectValid = true;
        subjectValue = e.target.value;
    } else {
        subjectValid = false;
        subjectValue = "";
    }
});

msgTextArea.addEventListener('input', (e) => {
    addCLass(msgTextArea, MessageRegex, e.target.value, msgValid);
    if (msgTextArea.classList.contains('is-valid')) {
        msgValid = true;
        msgValue = e.target.value;
    } else {
        msgValid = false;
        msgValue = "";
    }
});

// Écouteur d'événement pour la soumission du formulaire :
// Cet écouteur d'événements empêche la soumission normale du formulaire avec e.preventDefault(). Ensuite, il vérifie si tous les champs sont valides avant d'appeler une fonction Email.send pour envoyer le formulaire par e-mail.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (fnameValid && lnameValid && phoneValid && emailValid && subjectValid && msgValid) {
        // Envoi du formulaire par e-mail avec Email.send :
        // Cet appel à Email.send utilise des informations de configuration pour envoyer le contenu du formulaire par e-mail. 
        // La vérification message == 'OK' && location.reload() assure que la page est rechargée après l'envoi réussi du formulaire.
        Email.send({
            Host: "smtp.elasticemail.com",
            Username: "maillotjacques13@gmail.com",
            Password: "ABF36EADED0E1127FC735E9DD13AA06EE774",
            To: "hilltractors@yopmail.com",
            From: emailValue,
            Subject: subjectValue,
            Body: `Prénom : ${fnameValue} <br>
                    Nom : ${lnameValue} <br>
                    Téléphone : ${phoneValue}<br>
                    Message : ${msgValue}`
        }).then(message => message == 'OK' && location.reload());
    }
})
