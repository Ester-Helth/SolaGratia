<template>
    <div class="grafik_container">
        
        <div class="grafik_innercontainer_top">
            <h1>Grafisk</h1>
            <p>Her kan du se vores grafik</p>
        </div>

         <!-- showing products thats under the "grafik" category -->
         <router-link :to="{ name: 'productdetaljer', params: { id: produkt.id }}">
            <div class="product-view flex grid grid-cols-4 mt-10">
                
                <div class="product-card" v-for="produkt in produkter" :key="produkt">
                    <div class="product-card-image">
                        <img :src="produkt.produktBilleder" alt="Produktbillede af grafik">
                    </div>
                    <div class="product-card-info">
                        <h3>
                            {{ produkt.produktNavn }}
                        </h3>
                        <p>
                            {{ produkt.produktPris }}
                        </p>
                        <button class="themebutton mt-2">Se mere</button>
                    </div>
                </div>

            </div>
            
        </router-link>



    </div>
</template>

<script setup>
import useProdukter from '@/modules/useProdukter.js'
import { onMounted, toRefs, computed } from 'vue'

onMounted(() => {
  getProdukterData();
})

// get single page
const props = defineProps({
id: String
})

const { id } = toRefs(props)

const { produkter, getProdukterData } = useProdukter();

const produktDetail = computed(() => {
    return produkter.value.filter(item => item.id == id.value)
})

// scroll to top when opening page
onMounted(() => {
  window.scrollTo(0, 0)
})

</script>

<style lang="scss">

// typography
h1 {
  font-size: 40px;
  font-family: "adorn-condensed-sans", sans-serif;
  font-weight: 400;
  font-style: normal;
}

h3 {
    color: var(--black);
    font-size: 19px;
    font-weight: 500;
    font-style: normal;
    font-family: "elza-text", sans-serif;
    padding: 5px 0;
  }


// containers
.grafik_container {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 40px 10%;
    min-height: 100vh;
}

.grafik_innercontainer_top {
    display: flex;
    flex-direction: column;
    align-items: center;
}




</style>