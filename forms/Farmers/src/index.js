import { initializeApp } from 'firebase/app';

import {
    Timestamp, getFirestore, collection, onSnapshot, getDocs, addDoc, doc , serverTimestamp, updateDoc
} from 'firebase/firestore'

// import { imageUrl } from '../dist/image';

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


const addFarmerForm = document.querySelector('.add');
addFarmerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageInput = document.querySelector('#photo');
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        // If no image is selected, submit the form without the photo property
        addDoc(colRef, {
            // dist: addFarmerForm.district.value,
            // job: "farmer",
            // material: addFarmerForm.material.value,
            // name: addFarmerForm.name.value,
            // padding_etc: "",
            // phone: addFarmerForm.name.value,
            // photo: "",
            // price: addFarmerForm.price.value,
            // state: addFarmerForm.state.value,
            // weight: addFarmerForm.weight.value
            category: "Farmer Produce",
            imageUrl: "",
            price: addFarmerForm.price.value,
            title:  addFarmerForm.material.value,
            description: `${addFarmerForm.district.value} ${addFarmerForm.name.value} ${addFarmerForm.state.value} ${addFarmerForm.weight.value}`,
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
            addFarmerForm.reset();
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
                    // dist: addFarmerForm.district.value,
                    // job: "farmer",
                    // material: addFarmerForm.material.value,
                    // name: addFarmerForm.name.value,
                    // padding_etc: "",
                    // phone: addFarmerForm.phone.value,
                    // photo: imageUrlDiv.innerText,
                    // price: addFarmerForm.price.value,
                    // state: addFarmerForm.state.value,
                    // weight: addFarmerForm.weight.value
                    category: "Farmer Produce",
                imageUrl: imageUrlDiv.innerText,
                price: addFarmerForm.price.value,
                title:  addFarmerForm.material.value,
                description: `${addFarmerForm.district.value} ${addFarmerForm.name.value} ${addFarmerForm.name.value} ${addFarmerForm.state.value} ${addFarmerForm.weight.value}`,
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
                    addFarmerForm.reset();
                });
            });
        }
    );
});