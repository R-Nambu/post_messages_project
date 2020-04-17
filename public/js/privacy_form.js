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

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const storage = firebase.storage();
const collection = db.collection('contacts');
const contact = document.getElementById('contact');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const name = inputName.value;
    if (name == ""){
        return;
    }

    const email = inputEmail.value;
    if (email == ""){
        return;
    }

    const text = inputText.value;
    if (text == ""){
        return;
    }

    // name.value = '';
    // email.value = '';
    // text.value = '';
    
    collection.add({
        name: name,
        email: email,
        text: text,
        created: firebase.firestore.FieldValue.serverTimestamp(),
    })

    //処理に成功
    .then(doc => {
        console.log(`${doc.id} added!`);
    })
    //エラー処理
    .catch(error => {
        console.log(error);
    });
});