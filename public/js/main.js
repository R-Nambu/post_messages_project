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
const storage = firebase.storage();

const collection = db.collection('messages');
const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');
const setfile = document.getElementById("setfile");
const imgSample = document.getElementById("imgSample");

var file_name;
var blob;

collection.orderBy('created').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            const li = document.createElement('li');
            li.textContent = change.doc.data().message;
            messages.appendChild(li);
            
            const img = document.createElement('img');
            img.src = change.doc.data().url;
            img.height = 200; 
            li.appendChild(img);
        }
    })
});


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
        created: firebase.firestore.FieldValue.serverTimestamp(),
        //以下、今後作成予定 
        // category: ,
        // prefecture:
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
    
setfile.addEventListener('change', e => {
    var file = e.target.files;
    file_name = file[0].name;
    blob = new Blob(file, { type: 'image/jpeg' });
    console.warn(blob);
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        var uploadRef = storage.ref('images/').child(file_name);
        uploadRef.put(blob).then(snapshot => {
            console.log(snapshot.state);
            
            // アップロードしたファイルのurlを取得
            uploadRef.getDownloadURL()
            .then(url => {
                collection.add({
                    url: url,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    //以下、今後作成予定 
                    //category: ,
                    // prefecture:
                })
            }).catch(error => {
                console.log(error);
            });
                
        });
        // valueリセットする
        file_name = '';
        blob = '';
    });
});
        
message.focus();

//   collection.get().then(snap => {
//     size = snap.length;
//     console.log(size);
//     });

