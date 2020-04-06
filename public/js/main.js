'use strict';

const firebaseConfig = {
    apiKey: "AIzaSyBWoxjZUZ-b8Q9MjUsl6A3xLC4u_AYBjNU",
    authDomain: "post-messages-project.firebaseapp.com",
    databaseURL: "https://post-messages-project.firebaseio.com",
    projectId: "post-messages-project",
    storageBucket: "post-messages-project.appspot.com",
    messagingSenderId: "258093825171",
    appId: "1:258093825171:web:bd00a98ac9ac8bb86ea166",
    measurementId: "G-VR2BX6S7X7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
  const collection = db.collection('messages');

  const message = document.getElementById('message');
  const form = document.querySelector('form');
  const messages = document.getElementById('messages');

  collection.orderBy('created').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
              const li = document.createElement('li');
              li.textContent = change.doc.data().message;
              messages.appendChild(li);
            }
      })
  }) 



  form.addEventListener('submit', e => {
    e.preventDefault();

    const val = message.value.trim();
    if (val == ""){
        return;
    }

    message.value = '';
    message.focus();

    collection.add({
        message: val,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(doc => {
        console.log(`${doc.id} added!`);
    })
    .catch(error => {
        console.log(error);
    });
  });

  message.focus();

