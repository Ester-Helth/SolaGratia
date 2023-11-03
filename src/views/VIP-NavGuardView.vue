<template>
    <div class="navguard_container">

        <div class="flex justify-center">
            <h1>VIP</h1>
        </div>

        <!-- See and edit exsisting products -->
        <div>
            <h2 class="pt-10">Vælg kategori at redigere fra</h2>

            <!-- the 5 categories to open-->
            <div class="pt-4 pb-14 flex gap-4">
                
                <!-- toggles to use when editing/deleting-->
                <div>
                    <button class="themebutton" @click="toggleDisplay('Grafik')">Vis grafik</button>
                </div>
                <div>
                    <button class="themebutton" @click="toggleDisplay('Tøj')">Vis tøj</button>
                </div>
                <div>
                    <button class="themebutton" @click="toggleDisplay('Køkkenting')">Vis køkkenting</button>
                </div>
                <div>
                    <button class="themebutton" @click="toggleDisplay('Bøger')">Vis bøger</button>
                </div>
                <div>
                    <button class="themebutton" @click="toggleDisplay('Blogopslag')">Vis blogopslag</button>
                </div> 
                <div>
                    <button class="themebutton" @click="toggleDisplay('Blogopslag')">Luk kategorier</button>
                </div> 

            </div>

            <!-- showing category that he user/admin chose -->
            <div>
                <div v-if="show" class="view_innercontainer_bottom flex grid grid-cols-2">
                    <template v-for="produkt in produkter" :key="produkt">
                        <div v-if="show == produkt.produktKategori">
                            <div class="product-card-VIP"> 
                              
                                <!-- edit card -->
                                <div class="product-card-info-VIP">
                                    
                                    <div class="flex justify-between">
                                        <h2>Titel:</h2>
                                        <input type="text" placeholder="Rediger titel" v-model="produkt.produktNavn" class="VIP_form_inputs_title">
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <h2>Beskrivelse:</h2>
                                        <textarea type="text" placeholder="Rediger beskrivelse" rows="7" class="textarea_produktBeskrivelse" v-model="produkt.produktBeskrivelse" />
                                    </div>
                                    
                                    <div class="flex justify-between">
                                        <h2>Størrelse:</h2>
                                        <input type="text" placeholder="Rediger størelse/proportioner" v-model="produkt.produktStørrelse" class="VIP_form_inputs">
                                    </div>

                                    <div class="flex justify-between">
                                        <h2>Farve:</h2>
                                        <input type="text" placeholder="Rediger farve/materialer" v-model="produkt.produktFarve" class="VIP_form_inputs">
                                    </div>


                                    <div class="flex justify-between">
                                        <h2>Kategori:</h2>
                                        <select class="VIP_form_inputs" v-model="produkt.produktKategori">
                                            <option value disabled="">Rediger kategori</option>
                                            <option value="Grafik">Grafik</option>
                                            <option value="Tøj">Tøj</option>
                                            <option value="Køkken">Køkken</option>
                                            <option value="Bøger">Bøger</option>
                                            <option value="Blog">Blog</option>
                                        </select>
                                    </div>

                                    <div class="flex justify-between">
                                        <h2>Pris:</h2>
                                        <input type="text" placeholder="Rediger pris" v-model="produkt.produktPris" class="VIP_form_inputs">
                                    </div>                              
                                </div>

                                <div class="product-card-image-VIP mt-5 mb-4">
                                    <img :src="produkt.produktBilleder" alt="Produktbillede af grafik">
                                </div>

                                <!-- save the edits-->
                                <button class="themebutton mt-2" @click="firebaseUpdateSingleProdukt(produkt, produkter)">Gem oplysninger</button>
                                
                                <!-- delete item -->
                                <button class="differentbutton mt-2" @click="firebaseDeleteSingleProdukt(produkt.id)">Slet produkt</button>
                            
                            </div>
                        </div>
                    </template>
                </div>   
            </div>

        </div>
    
        <!-- Add new product -->
        <div class="flex flex-col content-center justify-center pt-10">
            <h2>Tilføj nyt produkt</h2>
        
            <form>
                <!-- Name -->
                <input type="text" placeholder="Produktets titel*" v-model="AddProduktData.produktNavn" class="VIP_form_inputs_title">

                <!-- Description -->
                <div class="mt-2">
                    <textarea type="text" placeholder="Produkt beskrivelse" rows="7" class="textarea_produktBeskrivelse" v-model="AddProduktData.produktBeskrivelse" />
                </div>

                <!-- Size -->
                <input type="text" placeholder="Produktets størelse eller proportioner" v-model="AddProduktData.produktStørrelse" class="VIP_form_inputs">

                <!-- Color or material -->
                <input type="text" placeholder="Produktets farve eller materialer" v-model="AddProduktData.produktFarve" class="VIP_form_inputs">
                
                <!-- Category - make a list here -->
                <!-- <input type="text" placeholder="Kategori" v-model="AddProduktData.produktKategori" class="VIP_form_inputs"> -->
                
                <select class="VIP_form_inputs" v-model="AddProduktData.produktKategori">
                    <option value="" disabled selected>Vælg en kategori*</option>
                    <option value="Grafik">Grafik</option>
                    <option value="Tøj">Tøj</option>
                    <option value="Køkken">Køkken</option>
                    <option value="Bøger">Bøger</option>
                    <option value="Blog">Blog</option>
                </select>

                <!-- Price -->
                <input type="text" placeholder="Produktets pris*" v-model="AddProduktData.produktPris" class="VIP_form_inputs">

                <!-- image -->
                <div class="flex flex-col justify-center content-center image_form_container">
                    <p>Upload billede herunder</p>
                    <input v-on:change="AddProduktData.produktBilleder" @change="uploadImg" alt="produkt billede" type="file" label="File input" width="200" height="200">
                </div>
                
                <!-- button to add the product to firebase -->
                <button class="themebutton mt-7" @click="firebaseAddSingleProdukt()">Tilføj produkt</button>
            </form>

            <!-- snackbar to show when user clicks the "add product" button above -->


            
        </div>
        

    </div>
</template>

<script setup>

    import { onMounted } from 'vue'
    import { ref } from 'vue';

    // modules import
    import useProdukter from '../modules/useProdukter.js'

    // import snackbarTilføjedeProdukter from '../modules/snackbarTilføjedeProdukter.js'

    // grabbing data from useProdukter.js
    const { produkter, getProdukterData } = useProdukter();

    onMounted(() => {
        getProdukterData();
    })

    // making it possible to add new products
    const { 
    firebaseAddSingleProdukt,
    AddProduktData,
    uploadImg,
    firebaseDeleteSingleProdukt, 
    firebaseUpdateSingleProdukt,
  } = useProdukter();

    // making it possible to edit and delete products

    // toggle for categories to edit or delete
    const show = ref(false);
    const toggleDisplay = (display) => {
        show.value = display;
    }

</script>

<style lang="scss"> 

// typography
h1 {
    font-size: 42px; 
    font-family: "adorn-condensed-sans", sans-serif;
    font-style: normal;
}

h2 {
    color: var(--black);
    font-size: 22px;
    font-family: "adorn-condensed-sans", sans-serif;
    font-weight: 400;
    font-style: normal;
}


// div containers
.navguard_container {
    display: flex;
    flex-direction: column;
    background-color: var(--yellow);
    padding: 40px 10%;
    min-height: 100vh;
}

// form 
form {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

    // textarea for produktBeskrivelse
    .textarea_produktBeskrivelse{
        background-color: var(--white);
        border: none;
        color: var(--black);
        padding: 13px 10px;
        border-radius: 4px;
        margin: 3px 0;
        width: 50%;
        font-size: 15px;
        font-family: "elza-text", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    // inputs
    .VIP_form_inputs {
        background-color: var(--white);
        border: none;
        color: var(--black);
        padding: 13px 10px;
        border-radius: 4px;
        margin: 3px 0;
        width: 50%;
        font-size: 15px;
        font-family: "elza-text", sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .VIP_form_inputs_title {
        background-color: var(--white);
        border: none;
        color: var(--black);
        padding: 13px 10px;
        border-radius: 4px;
        margin-top: 8px;
        width: 50%;
        font-size: 18px;
        font-family: "elza-text", sans-serif;
        font-weight: 500;
        font-style: normal;
    }

    .image_form_container {
        input button {
            margin-top: 10px;
        }
    }

</style>