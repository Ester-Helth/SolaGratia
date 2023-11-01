
// imports
import { db } from '../firebase.js'

import { ref } from 'vue'
import { collection, doc, onSnapshot, deleteDoc, addDoc, updateDoc} from 'firebase/firestore';
    // import useImg – how does this work?'

// const for eksportering
const useProdukter = () => {

    // storing data i firebase
    const produkter = ref([]); 

    // collection i firebase
    const produktDataRef = collection(db, 'produkter');

    // consts
    const AddProduktData = ref({
        produktName: "",
        produktDescription: "",
        produktPrice: "",
        produktSize: "",
        produktImg: "",
        produktCategoty: "",
    })

    // Når du skal "se" dataen i firebase, så skal du bruge onSnapshot for at hente produkterne. Når du har gjort det, så skal du bruge filter til at filtrere efter kategorierne. ### måske der skal bruges .includes() i stedet for .filter().

    const UpdateProduktData = ref({
        produktName: "",
        produktDescription: "",
        produktPrice: "",
        produktSize: "",
        produktImg: "",
        produktCategoty: "", 
    })

    // store documents
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

    // gør det muligt at slette det tilføjede produkt 
    const firebaseDeleteSingleProdukt = async (id) => {
        await deleteDoc(doc(db, "Produkter", id));
        console.log("er slettet", id);
    }

    // accept the button that adds item
    const firebaseAddSingleProdukt = async () => { 
        
        // tell it where to go
        await addDoc(collection(db, "produkter"),
            
            // tell it what to add
            {
                produktName: AddProduktData.value.produktName,
                produktDescription: AddProduktData.value.produktDescription,
                produktPrice: AddProduktData.value.produktPrice,
                produktSize: AddProduktData.value.produktSize,
                produktImg: AddProduktData.value.produktImg,
                produktCategoty: AddProduktData.value.produktCategoty,
            }
        )
        .then({
            produktName: AddProduktData.value.produktName = '',
            produktDescription: AddProduktData.value.produktDescription = '',
            produktPrice: AddProduktData.value.produktPrice = '',
            produktSize: AddProduktData.value.produktSize = '',
            produktImg: AddProduktData.value.produktImg = '',
            produktCategoty: AddProduktData.value.produktCategoty = '',
        })
    }


    const firebaseUpdateSingleProdukt = async (produktToUpdate) => { 
        const findProdukt = produkter.value.find(t => t.id === produktToUpdate.id);
        
        if (findProdukt) {
            const {
                produktName,
                produktDescription,
                produktPrice,
                produktSize,
                produktImg, 
                produktCategoty, 
            } = produktToUpdate;
    
            await updateDoc(doc(produktDataRef, produktToUpdate.id), {
                produktName,
                produktDescription,
                produktPrice,
                produktSize,
                produktImg, 
                produktCategoty,  
            });
        }
    }
    
    return {
        getProdukterData,
        produkter,
        firebaseDeleteSingleProdukt,
        firebaseAddSingleProdukt,
        AddProduktData,
        firebaseUpdateSingleProdukt,
        UpdateProduktData
    }
}

export default useProdukter;