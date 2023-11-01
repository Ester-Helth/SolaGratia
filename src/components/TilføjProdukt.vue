<template>
    <div>

    <!--dialogbox der kommer op når produkt er tilføjet-->
    <dialog ref="dialog" id="dialogbox" >
        <h1>Produkt tilføjet!</h1>
    </dialog>

      <div>
        <!-- Name -->
        <input type="text" placeholder="Produktets titel" v-model="AddProduktData.produktName" class="round-corner border-none text-sm w-full h-11 focus:ring-0 mb-4">
        
        <!-- Description -->
        <p>Produktbeskrivelse</p>
        <div class="mt-2">
          <textarea name="message" id="message" rows="4" class="white-bg round-corner border-none text-sm w-full h-18 mb-4" v-model="AddProduktData.produktDescription" />
        </div>

        <!-- Size -->
        <input type="text" placeholder="Produktets størelse" v-model="AddProduktData.produktSize" class="white-bg round-corner border-none text-sm w-full h-11 focus:ring-0 mb-4">
        
        <!-- Category -->
        <input type="text" placeholder="Kategori" v-model="AddProduktData.produktCategory" class="white-bg round-corner border-none text-sm w-full h-11 focus:ring-0 mb-4">
        
        <!-- Price -->
        <input type="text" placeholder="Produktets pris i kr." v-model="AddProduktData.produktPrice" class="round-corner border-none text-sm w-full h-11 focus:ring-0 mb-4">

        <!-- image -->
        <input v-on:change="uploadImg" alt="product picture" type="file" label="File input" width="200" height="200">

      </div>
  
    </div>
  </template>
  
<script setup>

import useProdukter from '../modules/useProdukter.js';

// create file and grabbing the data we need
const { 
  firebaseAddSingleProdukt,
  AddProduktData,
} = useProdukter();

</script>
  
<style>

</style>../modules/useProdukter.js