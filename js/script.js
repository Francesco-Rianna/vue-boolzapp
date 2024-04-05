// Milestone 1
// - Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// - Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
// Milestone 2
// - Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// - Click sul contatto mostra la conversazione del contatto cliccato
// Milestone 3
// - Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// - Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// Milestone 4
// - Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)



const { createApp } = Vue;

createApp({
  data() {
    return {
      contacts: [{
        name: 'Michele',
        avatar: '_1',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Hai portato a spasso il cane?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Ricordati di dargli da mangiare',
          status: 'sent'
        },
        {
          date: '10/01/2020 16:15:22',
          message: 'Tutto fatto!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        messages: [{
          date: '20/03/2020 16:30:00',
          message: 'Ciao come stai?',
          status: 'sent'
        },
        {
          date: '20/03/2020 16:30:55',
          message: 'Bene grazie! Stasera ci vediamo?',
          status: 'received'
        },
        {
          date: '20/03/2020 16:35:00',
          message: 'Mi piacerebbe ma devo andare a fare la spesa.',
          status: 'sent'
        }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        messages: [{
          date: '28/03/2020 10:10:40',
          message: 'La Marianna va in campagna',
          status: 'received'
        },
        {
          date: '28/03/2020 10:20:10',
          message: 'Sicuro di non aver sbagliato chat?',
          status: 'sent'
        },
        {
          date: '28/03/2020 16:15:22',
          message: 'Ah scusa!',
          status: 'received'
        }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        messages: [{
          date: '10/01/2020 15:30:55',
          message: 'Lo sai che ha aperto una nuova pizzeria?',
          status: 'sent'
        },
        {
          date: '10/01/2020 15:50:00',
          message: 'Si, ma preferirei andare al cinema',
          status: 'received'
        }
        ],
      },
      ],
      activeUser: 0,
      newTextMessage: '',
      searchUser: ''
    };
  },
  methods: {
    selectUser: function (index) {
      this.activeUser = index

    },
    // funzione per creare nuovo messaggio 
    newMessage: function () {
      var date = new Date(); // Oggetto Date corrente
      var dateString = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);

      const newMessage = {
        date: dateString,
        status: 'sent',
        message: this.newTextMessage,

      }
      this.contacts[this.activeUser].messages.push(newMessage)
      this.newTextMessage = ''
      setTimeout(this.newBotMessage, 1000)

    },
    // funzione per creare una risposta
    newBotMessage: function () {
      var date = new Date(); // Oggetto Date corrente
      var dateString = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);

      const newMessage = {
        date: dateString,
        status: 'received',
        message: 'ok',

      }
      this.contacts[this.activeUser].messages.push(newMessage)

    },
    // funzione che serve per filtrare nella ricerca degli utenti 
    findUtent: function () {
      const searchTerm = this.searchUser.toLowerCase(); //utilizzo il lowercase perchè fa si che quando l'utente cerca non ci sia distinzione tra le minuscole e maiuscole 

      this.contacts.forEach((contact, index) => {
        // controllo se il nome include la stringa inserita dall'utente 
        if (this.contacts[index].name.toLowerCase().includes(searchTerm)) {
          this.contacts[index].visible = true;
        } else {

          this.contacts[index].visible = false;
        }
      });
    }

  }
}).mount('#app');



