
// imports
import { db } from '../firebase.js'

import { ref } from 'vue'
import { collection, doc, onSnapshot, deleteDoc, addDoc, updateDoc} from 'firebase/firestore';

import { getStorage, ref as refFB, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// const for export
const useProdukter = () => {

    // storing data in firebase
    const produkter = ref([]); 

    // collection in firebase
    const produktDataRef = collection(db, 'produkter');

    // consts for add and update
    const AddProduktData = ref({
        produktNavn: "",
        produktBeskrivelse: "",
        produktPris: "",
        produktStørrelse: "",
        produktFarve: "",
        produktBilleder: "",
        produktKategori: "", 
    })

    // Når du skal "se" dataen i firebase, så skal du bruge onSnapshot for at hente produkterne. Når du har gjort det, så skal du bruge filter til at filtrere efter kategorierne. ### måske der skal bruges .includes() i stedet for .filter().

    const UpdateProduktData = ref({
        produktNavn: "",
        produktBeskrivelse: "",
        produktPris: "",
        produktStørrelse: "",
        produktFarve: "",
        produktBilleder: "",
        produktKategori: "", 
    })

    // makes it possible to get the data from firebase
    const getProdukterData = () => {
        onSnapshot(produktDataRef, (snapshot) => {
            produkter.value = snapshot.docs.map(doc => {
                return {
                id: doc.id,
                ...doc.data()
                }
            })
        })
    }

    // makes it possible to delete a product
    const firebaseDeleteSingleProdukt = async (id) => {
        await deleteDoc(doc(db, "Produkter", id));
    }

    // for adding product
    const firebaseAddSingleProdukt = async () => { 
        const imageUrl = tutorImg.value; // the image url from the storage
        // tells it what collection to go
        await addDoc(collection(db, "produkter"),
            
            // adding the data
            {
            produktNavn: AddProduktData.value.produktNavn,
            produktBeskrivelse: AddProduktData.value.produktBeskrivelse,
            produktPris: AddProduktData.value.produktPris,
            produktStørrelse: AddProduktData.value.produktStørrelse,
            produktFarve: AddProduktData.value.produktFarve,
            produktBilleder: AddProduktData.value.produktBilleder,
            produktKategori: AddProduktData.value.produktKategori,
            }
        )
        .then({
            produktNavn: AddProduktData.value.produktNavn = '',
            produktBeskrivelse: AddProduktData.value.produktBeskrivelse = '',
            produktPris: AddProduktData.value.produktPris = '',
            produktStørrelse: AddProduktData.value.produktStørrelse = '',
            produktFarve: AddProduktData.value.produktFarve = '',
            produktBilleder: AddProduktData.value.produktBilleder = '',
            produktKategori: AddProduktData.value.produktKategori = '',
        })
    }

    // for updating product
    const firebaseUpdateSingleProdukt = async (produktToUpdate) => { 
        const findProdukt = produkter.value.find(t => t.id === produktToUpdate.id);
        
        if (findProdukt) {
            const {
                produktNavn,
                produktBeskrivelse,
                produktPris,
                produktStørrelse,
                produktFarve,
                produktBilleder, 
                produktKategori, 
            } = produktToUpdate;
    
            await updateDoc(doc(produktDataRef, produktToUpdate.id), {
                produktNavn,
                produktBeskrivelse,
                produktPris,
                produktStørrelse,
                produktFarve,
                produktBilleder, 
                produktKategori,  
            });
        }
    }

    // Images upload 
    const storage = getStorage();
    const produktBilleder = ref(''); 

    const uploadImg = async(event) => {
        let file = event.target.files[0]; // 0 because array indexing in JavaScript is zero-based
    
        // metadata for the file
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };
        
        // Upload file to Firebase Storage
        const storageRef = refFB(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        
        
        // Checking if the upload is running
        uploadTask.on('state_changed',
            (snapshot) => {
            
            // Checking bytes transferred and total bytes
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload er sat på pause');
                break;
                case 'running':
                console.log('Upload er igang');       
                break;
            }
            }, 
            (error) => {
            switch (error.code) {
                // If the server returns an error
                case 'storage/unauthorized':
                break;

                // If the user canceled the upload
                case 'storage/canceled':
                break;

                // If the upload is unknown
                case 'storage/unknown':
                break;
            }
            }, 
            
            () => {
            // If the upload is successful and now we have access to the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                produktBilleder.value = downloadURL 
            });
            }  
        );
    }
 
    return {
        getProdukterData,
        produkter,
        firebaseDeleteSingleProdukt,
        firebaseAddSingleProdukt,
        AddProduktData,
        firebaseUpdateSingleProdukt,
        UpdateProduktData,
        uploadImg,
    }
}

export default useProdukter;