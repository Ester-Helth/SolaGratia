<template>
    <div class="product_detail_container flex">
        
        <!-- filtering in the array that the product is saved in -->
        <div class="produkt-detail-image">
            <img :src="filteredArray[0].produktBilleder" alt="Produkt billede" />
        </div>
        
        <div class="ml-10">
            <div>
                <h1>
                {{ filteredArray[0].produktNavn }}
                </h1>
            </div>
            
            <div>
                <p> <span class="font-medium">Pris:</span> 
                {{ filteredArray[0].produktPris }}
                </p>
                <p> <span class="font-medium">Beskrivelse:</span> 
                {{ filteredArray[0].produktBeskrivelse }}
                </p>
                <p> <span class="font-medium">Farve/materale:</span> 
                {{ filteredArray[0].produktFarve }}
                </p>
                <p> <span class="font-medium">Størrelse:</span> 
                {{ filteredArray[0].produktStørrelse }}
                </p>   
            </div>

            <button class="themebutton mt-10"> Læg i kurv </button>
        </div>
    
    </div> 
</template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue'
  import useProdukter from '@/modules/useProdukter.js';
  import { useRoute } from 'vue-router'

  const { produkter, getProdukterData, state } = useProdukter();
  const route = useRoute()

getProdukterData()

const filteredArray = ref([])

const filterArray = () => {
    produkter.value.forEach(produktData =>{ 
        // console.log(produktData.id + " " + route.params.id)
		if(produktData.id == route.params.id){
			filteredArray.value.push(produktData)
		}
	}) 
}

setTimeout(() => {
    filterArray()
}, 1);


   
  </script>
  
  <style>
  h1 {
    color: var(--black);
    font-size: 42px; 
    font-family: "adorn-condensed-sans", sans-serif;
    font-weight: 400;
    font-style: normal;
  }

.product_detail_container {
    background-color: var(--lightgray);
    padding: 90px 10%;
}

/* image */
.produkt-detail-image {
  max-height: max-content;
  width: 26vw;
  object-fit: cover;
  border-radius: 4px;
}
  
  </style>