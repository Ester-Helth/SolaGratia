<template>
    <div class="navguard_container">
        <div class="flex justify-center">
            <h1>VIP</h1>
        </div>

        <!-- Se og ændrer eksisterende produkter -->
        <div>
            <h2 class="pt-10">Vælg kategori at ændre eller slette fra</h2>

            <!-- Vælg en af de 5 forskellige kategorier at ændre fra-->
            <div class="pt-4 pb-14 flex gap-4">
                <!-- <div>
                    <button class="themebutton" @click="toggleGrafik>Vis grafik</button>
                </div> -->
                
                <!-- // <div>
                // <button class="white-btn" @click="">Vis tøj</button>
                // </div>
                // <div>
                // <button class="white-btn" @click="">Vis køkkenting</button>
                // </div>
                // <div>
                // <button class="white-btn" @click="">Vis bøger</button>
                // </div>
                // <div>
                // <button class="white-btn" @click="">Vis blogopslag</button>
                // </div> -->
               
            </div>

        </div>
    
        <!-- Tilføj et nyt produkt -->
        <div class="flex flex-col content-center justify-center pt-10">
            <h2>Tilføj et nyt produkt</h2>
        </div>

        <button @click="isOpen = true">Add new tutor</button>
          <teleport to="body">
            <div class="modal" v-if="isOpen">
              <TilføjProdukt @close="isOpen = false">

              </TilføjProdukt>
            </div>
          </teleport>

        
        
    </div>
</template>

<script setup>

    import { onMounted } from 'vue'
    import { ref } from 'vue';

    // modules import
    import useProdukter from '../modules/useProdukter.js'

    // components (teleport in template) import
    import AddProdukt from '../components/TilføjProdukt.vue'

    // grabbing the data we need
    const {
    getProdukterData, 
    } = useProdukter();

    onMounted(() => {
    getProdukterData();
    })


    // toggle til "grafik" itmes
    // const showGrafik = ref(false);
    // const toggleGrafik= () => {
    // showGrafik.value = !showGrafik.value;
    // }



</script>

<style lang="scss"> 

// typography
h1 {
    font-size: 42px; 
    font-family: "adorn-condensed-sans", sans-serif;
    font-weight: 400;
    font-style: normal;
}

h2 {
    color: var(--black);
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    font-family: "elza-text", sans-serif;
}

// div containers
.navguard_container {
    display: flex;
    flex-direction: column;
    background-color: var(--yellow);
    padding: 40px 10%;
    min-height: 100vh;
}
</style>