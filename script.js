"use strict";

const account1 = {
  owner: "Dmitrii Fokeev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    "2025-01-09T11:04:48.046Z",
    "2025-05-11T10:19:48.046Z",
    "2025-11-14T08:44:48.046Z",
    "2025-01-06T10:30:48.046Z",
    "2025-05-30T10:40:48.046Z",
    "2025-07-05T10:22:48.046Z",
    "2025-06-14T10:03:48.046Z",
    "2025-01-06T10:30:48.046Z",
  ],
};

const account2 = {
  owner: "Anna Filimonova",
  movements: [5000, 3400, -150, -790, 3210, -1000, 8500, -30],
  pin: 1111,
  movementsDates: [
    "2025-01-09T11:04:48.046Z",
    "2025-05-11T10:19:48.046Z",
    "2025-11-14T08:44:48.046Z",
    "2025-01-06T10:30:48.046Z",
    "2025-05-30T10:40:48.046Z",
    "2025-07-05T10:22:48.046Z",
    "2025-06-14T10:03:48.046Z",
    "2025-01-06T10:30:48.046Z",
  ],
};

const account3 = {
  owner: "Polina Filimonova",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 1111,
  movementsDates: [
    "2025-01-09T11:04:48.046Z",
    "2025-05-11T10:19:48.046Z",
    "2025-11-14T08:44:48.046Z",
    "2025-01-06T10:30:48.046Z",
    "2025-05-30T10:40:48.046Z",
    "2025-07-05T10:22:48.046Z",
    "2025-06-14T10:03:48.046Z",
    "2025-01-06T10:30:48.046Z",
  ],
};

const account4 = {
  owner: "Stanislav Ivanchenko",
  movements: [430, 1000, 700, -50, 90],
  pin: 1111,
  movementsDates: [
    "2025-01-09T11:04:48.046Z",
    "2025-05-11T10:19:48.046Z",
    "2025-11-14T08:44:48.046Z",
    "2025-01-06T10:30:48.046Z",
    "2025-05-30T10:40:48.046Z",
    "2025-07-05T10:22:48.046Z",
    "2025-06-14T10:03:48.046Z",
    "2025-01-06T10:30:48.046Z",
  ],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login-user");
const inputLoginPin = document.querySelector(".login-pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");





// 1)FUNCTION   Aggiungo movimenti  reali alla lista del utente dal arr
function displayMovements(acc) {
    containerMovements.innerHTML = ""; // Cancella pezzo di codice HTML

    acc.movements.forEach((value, index) => { // Itera su acc.movements
        const type = value > 0 ? "deposit" : "withdrawal"; // Cambia il colore rosso-verde
        const adebAccred = value > 0 ? "Accreditato" : "Addebitato"; // Cambia la scritta dentro

        const date = new Date(acc.movementsDates[index]); // Usa movementsDates correttamente
        const anno = date.getFullYear();
        const mese = `${date.getMonth() + 1}`.padStart(2, 0);
        const giorno = `${date.getDate()}`.padStart(2, 0);
        const ora = `${date.getHours()}`.padStart(2, 0);
        const min = `${date.getMinutes()}`.padStart(2, 0);
        const dataFormFinal = `${giorno}/${mese}/${anno}  ${ora}:${min}`;

        const html = `<div class="movements__row">
                <div class="movements__type movements__type--${type}">${index + 1} ${adebAccred}</div>
                <div class="movements__date">${dataFormFinal}</div>
                <div class="movements__value">${value} E</div>
            </div>`;

        containerMovements.insertAdjacentHTML("afterbegin", html); // Aggiunge codice HTML alla pagina
    });
}





// 2)FUNCTION   Aggiunto key "login" sul oggetto con creazione della sigla 
function sig(paramet){
  paramet.forEach(value =>{
    value.login = value.owner  //crea una nuova key "login" sul oggetto
    .toLowerCase()
    .split(" ")               // str in arr e separato
    .map(va => va[0])         // selezionato solo prima lettera del elemento
    .join("")                 // unito insieme elementi e convertito in str
  });
}

// Genera la proprietà "login" per tutti gli account
sig(accounts);






// 3)FUNCTION   Summa  nel Conto sulla pagina principale
function sumaConto(value) {
    const totale = value.movements.reduce((acc, valore) => acc + valore, 0); // Calcola il totale dei movimenti

    value.balance = totale; // Crea proprietà "balance" dell'account

    labelBalance.innerHTML = `${totale} E`; // Mostra il saldo sulla pagina
}




  // 4)FUNCTION  tutti conti  entrate/uscite che sono in fondo la pagina
function entrata(summa) {
   const filtPositiv = summa.movements.filter(valore => valore > 0); // Filtra i valori positivi
   const filtNegativ = summa.movements.filter(valore => valore < 0); // Filtra i valori negative

   const totaleEntrate = filtPositiv.reduce((acc,somma) => acc + somma)
   const totaleUscite= filtNegativ.reduce((acc,somma) => acc + somma)

   labelSumIn.textContent = `${totaleEntrate} E`;     //aggiunge soma alle entrate
   labelSumOut.textContent = `${Math.abs(totaleUscite)} E`; //aggiunge soma alle uscite (Math.abs -> cancela il "-" davanti il conto)
   labelSumInterest.textContent = `${totaleEntrate + totaleUscite} E`
}




 // 5) Attivo tutti Function
 function attivoFunction(element) {
    displayMovements(element); 
    sumaConto(element);
    entrata(element);
 }


 // 6)FUNCTION Loghin e accesso al proprio acount
let currentAcount;
let tickTock;
btnLogin.addEventListener ("click", function(e) {
  e.preventDefault();       //disattiva comportamento sdandart del button nel form
  currentAcount = accounts.find(par => par.login === inputLoginUsername.value); //controlla se login del acount e = con quel inserito sulla pagina

  if (currentAcount && currentAcount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = ""   //cancella dati inserite nel login
    attivoFunction(currentAcount)     //attivo tutti function
  } else {
    alert("Login o Password Errato")}

    //aggiungo ora precisa al display
    const dataAttuale = new Date();
    const lingua = navigator.language;  //lingua,formato del browser 
    const clock = {     //option che voglio che si vede sul formato
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric"
    };
    const dataFormFinal = Intl.DateTimeFormat(lingua, clock).format(dataAttuale); //formato finale


    //controlla se ce qualche timer attivo e lo cancella
    if (tickTock){
      clearInterval(tickTock)
     }
     tickTock = timer();  //attiva timer per una nuova entrata nel acount
   
    labelDate.textContent = dataFormFinal  //imposto data/ora sulla pagina principale
});





 // 7)FUNCTION Bonifico
 btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

const destinatario = accounts.find(element => element.login === inputTransferTo.value);
const summaBonifico = Number(inputTransferAmount.value);

if (
  destinatario &&         // se esiste un accout cosi
  summaBonifico > 0 &&      // summa deve essere + di 0
  currentAcount.balance >= summaBonifico  &&  // acount.balance += dell bonifico
  destinatario.login !== currentAcount.login) {  //destinatario diverso dal login
      //aggiorna i movimenti sulla lista
    destinatario.movements.push(summaBonifico);
    currentAcount.movements.push(-summaBonifico);

    currentAcount.movementsDates.push(new Date().toISOString());  //aggiungo data reale
    destinatario.movementsDates.push(new Date().toISOString());
    attivoFunction(currentAcount);
     
    inputTransferAmount.value = inputTransferTo.value  = ""  // pilisce i campi compilati
} else {
    alert("Errore di inserimento dati");
    inputTransferAmount.value = inputTransferTo.value  = ""

   }
});




// 8)Function Cancella accout
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

 if (inputCloseUsername.value === currentAcount.login // user nella casella corisponde con account corrente
      && Number(inputClosePin.value) === currentAcount.pin) {

        const index = accounts.findIndex(element => element.login === currentAcount.login);   //cerca il posto del elemnto sul array
          accounts.splice(index,1); //cancella il posto
          containerApp.style.opacity = 0;
          console.log(accounts);
      } else {
  alert("Errore Compilazione")
  inputCloseUsername.value = inputClosePin.value = "";
}
   })

 

// 9) Function Ricarica
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  currentAcount.movementsDates.push(new Date().toISOString()) ;  //aggiungo data reale

  const ImportRicarica = Number(inputLoanAmount.value);
  if (ImportRicarica > 0) {
    currentAcount.movements.push(ImportRicarica);
  }
  attivoFunction(currentAcount);
  inputLoanAmount.value = "";

})





// 10)Function Filtro , visualiza tutti movimenti / o solo negativi
let invertitore = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  // Alterna lo stato del filtro
  invertitore = !invertitore;

  // Se invertitore è true, filtra solo i movimenti negativi
  const datiFiltrati = invertitore
    ? currentAcount.movements
        .map((mov, i) => ({
          movimento: mov,
          data: currentAcount.movementsDates[i],
        }))
        .filter(item => item.movimento < 0) // Mantieni solo i numeri negativi
    : currentAcount.movements.map((mov, i) => ({
        movimento: mov,
        data: currentAcount.movementsDates[i],
      })); // Mostra tutti i movimenti

  // Aggiorna l'oggetto account con i dati filtrati o originali
  const accountTemporaneo = {
    ...currentAcount,
    movements: datiFiltrati.map(item => item.movimento),
    movementsDates: datiFiltrati.map(item => item.data),
  };

  displayMovements(accountTemporaneo); // Passa l'oggetto account aggiornato
});




// 11) Timer logOut
function timer() {
  let timp = 300; // Imposta il timer iniziale a 300sec (5 min)

  function tick() {
    const min = String(Math.trunc(timp / 60)).padStart(2, 0); // convertito nella stringa per poter usare(padstart)
    const sec = String(timp % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`; // Aggiorna il timer sulla pagina

    if (timp === 0) {
      clearInterval(conSetInter); // Ferma il timer
      const continua = confirm("SESSIONE SCADUTA , VUOI CONTINUARE ?"); // Mostra la schermata di conferma
      if (continua) {
        timer()
       } else {
        containerApp.style.opacity = 0; // Nasconde l'app se l'utente non vuole continuare
      }
    } else {
      timp--; // Decrementa il tempo solo se non è ancora 0
    }
  }

  tick(); // Esegui subito per mostrare il timer iniziale
  let conSetInter = setInterval(ti ck, 1000); // Aggiorna ogni secondo

  return conSetInter;
}



