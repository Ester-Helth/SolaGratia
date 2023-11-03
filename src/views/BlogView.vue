<template>
    <div class="blog_container">
        
        <div class="blog_innercontainer_top">
            <h1>Blog</h1>
        </div>

        <!-- showing products for clothing -->
        <div class="view_innercontainer_bottom flex grid grid-cols-4 mt-10">
            <template v-for="produkt in produkter" :key="produkt">
                <div v-if="produkt.produktKategori == 'Blog'">
                    <div class="product-card"> 
                        
                    <router-link :to="`/produktdetaljer/${produkt.id}`">
                
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
                        
                        
                    </router-link>
                    </div>
                </div>
            </template>
        </div>


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

.blog_container {
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 40px 10%;
    min-height: 100vh;
}

.blog_innercontainer_top {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>
