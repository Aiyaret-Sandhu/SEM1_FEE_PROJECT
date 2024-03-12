import { initializeApp } from 'firebase/app';

import {
    Timestamp, getFirestore, collection, onSnapshot, getDocs, addDoc, doc , serverTimestamp, updateDoc
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
const colRef = collection(db, 'products')

onSnapshot(colRef, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
}) 


const addFoodForm = document.querySelector('.add');
addFoodForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageInput = document.querySelector('#photo');
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        // If no image is selected, submit the form without the photo property
        addDoc(colRef, {
            // dist: addFoodForm.district.value,
            // job: "provider",
            // material: addFoodForm.material.value,
            // name: addFoodForm.name.value,
            // phone: addFoodForm.phone.value,
            // photo: "",
            // price: addFoodForm.price.value,
            // state: addFoodForm.state.value,
            // weight: addFoodForm.weight.value
            category: "Domestic Food",
            imageUrl: "",
            price: addFoodForm.price.value,
            title:  addFoodForm.material.value,
            description: `${addFoodForm.district.value} ${addFoodForm.name.value} ${addFoodForm.state.value} ${addFoodForm.weight.value}`,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            })
        })
        .then(() => {
            addFoodForm.reset();
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
                    // dist: addFoodForm.district.value,
                    // job: "provider",
                    // material: addFoodForm.material.value,
                    // name: addFoodForm.name.value,
                    // phone: addFoodForm.phone.value,
                    // photo: imageUrlDiv.innerText,
                    // price: addFoodForm.price.value,
                    // state: addFoodForm.state.value,
                    // weight: addFoodForm.weight.value
                    category: "Domestic Food",
                    imageUrl: imageUrlDiv.innerText,
                    price: addFoodForm.price.value,
                    title:  addFoodForm.material.value,
                    description: `${addFoodForm.district.value} ${addFoodForm.name.value} ${addFoodForm.state.value} ${addFoodForm.weight.value}`,
                    time: Timestamp.now(),
                    date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                    )
                })
                .then(() => {
                    addFoodForm.reset();
                });
            });
        }
    );
});