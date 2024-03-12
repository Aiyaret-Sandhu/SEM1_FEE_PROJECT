import { initializeApp } from 'firebase/app';

import {
    getFirestore, collection, onSnapshot, getDocs, addDoc, doc , serverTimestamp, updateDoc
} from 'firebase/firestore'


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCvEvmeOri0166GEU1TEgDVKvXvv6dKbKA",
    authDomain: "myfirstapp-de4de.firebaseapp.com",
    projectId: "myfirstapp-de4de",
    storageBucket: "myfirstapp-de4de.appspot.com",
    messagingSenderId: "635975662063",
    appId: "1:635975662063:web:0021c890c011857edd1e1a"
  };


initializeApp(firebaseConfig)


const db = getFirestore()
const storage = getStorage();
const colRef = collection(db, 'delivery-boys')

onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
}) 


const adddeliveryForm = document.querySelector('.add');
adddeliveryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageInput = document.querySelector('#photo');
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        // If no image is selected, submit the form without the photo property
        addDoc(colRef, {
            dist: adddeliveryForm.district.value,
            job: "delivery boy",
            age: adddeliveryForm.age.value,
            name: adddeliveryForm.name.value,
            phone: adddeliveryForm.phone.value,
            photo: "",
            state: adddeliveryForm.state.value,
        })
        .then(() => {
            adddeliveryForm.reset();
        });
        return;
    }

    // If an image is selected, upload it first and then submit the form
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                const imageUrlDiv = document.querySelector('.imageurl');
                imageUrlDiv.innerText = downloadURL;

                // Add the image URL to the photo property and submit the form
                addDoc(colRef, {
                    photo: imageUrlDiv.innerText,
                    dist: adddeliveryForm.district.value,
                    job: "delivery boy",
                    age: adddeliveryForm.age.value,
                    name: adddeliveryForm.name.value,
                    phone: adddeliveryForm.phone.value,
                    photo: "",
                    state: adddeliveryForm.state.value,
                })
                .then(() => {
                    adddeliveryForm.reset();
                });
            });
        }
    );
});