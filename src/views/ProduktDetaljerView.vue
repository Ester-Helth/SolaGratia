<template>
    <div>
        
        <!-- filtrer i arrayet som produktet er gemt i -->
        <div>
            <img :src="filteredArray[0].produktBilleder" alt="Produkt billede" />
        </div>
        
        <div>
            <h1>
            {{ filteredArray[0].produktNavn }}
            </h1>
        </div>
        
        <div>
            <p>
            {{ filteredArray[0].produktPris }}
            </p>
            <p>
            {{ filteredArray[0].produktBeskrivelse }}
            </p>
            <p>
            {{ filteredArray[0].produktFarve }}
            </p>
            <p>
            {{ filteredArray[0].produktStørrelse }}
            </p>   
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
}, 2000);


   
  </script>
  
  <style>
  
  
  </style>