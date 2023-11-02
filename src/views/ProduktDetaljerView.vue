<template>
    <div v-if="produktDetaljer">
  

        <div>
            <img :src="produkt.produktBilleder" alt="Produkt billede" />
        </div>
        
        <div>
            <h1>
            {{ produkt.produktNavn  }}
            </h1>
        </div>
        
        <div>
            <p>
            {{ produkt.produktPris }}
            </p>
              
        </div>

          <!-- produktNavn: "",
        produktBeskrivelse: "",
        produktPris: "",
        produktStørrelse: "",
        produktFarve: "",
        produktBilleder: "",
        produktKategori: "",  -->
  
        

       
  
    </div> 
</template>
  
  
  
  <script setup>
  import { onMounted, ref, computed } from 'vue'
  import useProdukter from '../modules/useProdukter.js';
  import {useRouter} from 'vue-router';
  
  </script>
  
  <style>
  
  
  </style>