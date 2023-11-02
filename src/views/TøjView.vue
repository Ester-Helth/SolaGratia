<template>
    <div class="tøj_container">
        
        <div class="tøj_innercontainer_top">
            <h1>Tøj</h1>
            <p>Her kan du se tøjkollektionen</p>
        </div>

        <!-- showing products for clothing -->
        <div v-for="produkt in produkter" :key="produkt">
            <div>
                <img :src="produkt.produktBilleder" alt="Produktbillede af tøj">
            </div>
            <p>
                {{ produkt.produktNavn }}
            </p>
            <p>
                {{ produkt.produktPris }}
            </p>
        </div>



    </div>
</template>

<script setup>

    import useProdukter from '../modules/useProdukter.js';
    import { onMounted } from 'vue'

    // const { 
    // produkter,  // henter data så bruger kan se det
    // getProdukterData,   // henter data så bruger kan se det
    // firebaseDeleteSingleItem, // til admin, så de kan slette produkter
    // firebaseAddSingleItem , // til admin, så de kan tilføje produkter
    // AddProductData,         // til admin, så de kan tilføje produkter - hører sammen med firebaseAddSingleItem
    // firebaseUpdateSingleItem, // til admin, så de kan redigere produkter
    // uploadImg,
    // //UpdateProdukterData
    // } = useProducts();

    // onMounted(() => {
    // getProdukterData()
    // })


</script>

<style lang="scss">

h1 {
  font-size: 40px;
  font-family: "adorn-condensed-sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.tøj_container {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 40px 10%;
    min-height: 100vh;
}

.tøj_innercontainer_top {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>