import { initializeApp } from 'firebase/app';
import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    getDocs, 
    addDoc, 
    doc, 
    serverTimestamp, 
    updateDoc 
} from 'firebase/firestore';
import { 
    getStorage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL 
} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCvEvmeOri0166GEU1TEgDVKvXvv6dKbKA",
    authDomain: "myfirstapp-de4de.firebaseapp.com",
    projectId: "myfirstapp-de4de",
    storageBucket: "myfirstapp-de4de.appspot.com",
    messagingSenderId: "635975662063",
    appId: "1:635975662063:web:0021c890c011857edd1e1a"
  };
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const dataContainer = document.getElementById('data-container');

// Function to render document data
const renderDocument = (data) => {
    const docDiv = document.createElement('div');
    docDiv.innerHTML = ``
    if (data.imageUrl) {
        const img = document.createElement('img');
        img.src = data.imageUrl;
        img.alt = data.title;
        docDiv.appendChild(img);
    } else {
        docDiv.innerHTML += `<p>No image available</p>`;
    }

    docDiv.innerHTML += `
    <h2 class="material" >Material: ${data.title}</h2>
    <p class="price">Price: <span style="color:#32cd32;">₹ ${data.price}</span></p>
    <p class="location">Location: ${data.description}</p>
    `;

    dataContainer.appendChild(docDiv);
};

// Retrieve data from Firestore
const fetchData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            renderDocument(data);
        });

        // const querySnapshot2 = await getDocs(collection(db, 'houses'));
        // querySnapshot2.forEach((doc) => {
        //     const data = doc.data();
        //     renderDocument(data);
        // });
    } catch (error) {
        console.error('Error getting documents: ', error);
    }
};

fetchData();
