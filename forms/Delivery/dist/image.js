const firebaseConfig = {
    apiKey: "AIzaSyCz_uy2uoot9oQcl_2L8CoNVCrOWceWk8o",
    authDomain: "groco-ad815.firebaseapp.com",
    projectId: "groco-ad815",
    storageBucket: "groco-ad815.appspot.com",
    messagingSenderId: "192212069035",
    appId: "1:192212069035:web:8d84c98f7b1de4bef125ee"
 };
 
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 
 let imagePer = "";
 let imageUrl = "";
 
 function uploadImage() {
   const ref = firebase.storage().ref();
   const file = document.querySelector("#photo").files[0];
   const name = +new Date() + "-" + file.name;
   const metadata = {
       contentType: file.type
   };
   const task = ref.child(name).put(file, metadata);
 
   // Register three observers:
   // 1. 'state_changed' observer, called any time the state changes
   task.on('state_changed', function(snapshot) {
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       imagePer = 'Upload is ' + progress.toFixed(2) + '% done';
       // Update the progress in the corresponding <div> element
       document.querySelector('.imgpercent').innerText = imagePer;
       switch (snapshot.state) {
           case firebase.storage.TaskState.PAUSED: // or 'paused'
               console.log('Upload is paused');
               break;
           case firebase.storage.TaskState.RUNNING: // or 'running'
               console.log('Upload is running');
               break;
       }
   });
 
   task.then(snapshot => snapshot.ref.getDownloadURL())
   .then(url => {
       console.log(url);
       alert('image uploaded successfully');
       imageUrl = url;
       // Update the image URL in the corresponding <div> element
       document.querySelector('.imageurl').innerText = imageUrl;
       const img = document.getElementById('image');
       if (img) {
           img.src = url;
           imageUrl = url;
       }
   })
   .catch(console.error);
 }
 
 const errorMsgElement = document.querySelector('span#errorMsg');
 
 document.getElementById('upload').addEventListener('click', function() {
    uploadImage();
 });
 
 
 export { imageUrl };