<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button class="btn-add" @click="firebaseAddSingleItem()">Add Item</button>
    <div>
  <!--       <input type="text" placeholder="Product name" v-model="AddProductData.productName" >
 -->
    </div>
    <hr>

    <div v-for="product in produkter" :key="product">
      <p>
        ProductID: {{ product.id  }}
      </p>
      <p>
        ProductName: {{ product.productName }}
      </p>
      <p>
        ProductPrice: {{ product.productPrice }}
      </p>
      <button class="btn-delete" @click="firebaseDeleteSingleItem(product.id)">Delete item</button>
    
      <p>
        <input type="text" placeholder="New product name" v-model="product.productName" />
      </p>
      <button class="btn-edit" @click="firebaseUpdateSingleItem(product.id)">Edit item</button>
      <hr>
    </div>
  </div>
</template>

<script setup>
import useProducts from '../modules/useProdukter.js';
import { onMounted } from 'vue'

const { 
  produkter,  // henter data så bruger kan se det
  getProdukterData,   // henter data så bruger kan se det
  firebaseDeleteSingleItem, // til admin, så de kan slette produkter
  firebaseAddSingleItem , // til admin, så de kan tilføje produkter
  AddProductData,         // til admin, så de kan tilføje produkter - hører sammen med firebaseAddSingleItem
  firebaseUpdateSingleItem, // til admin, så de kan redigere produkter
  //UpdateProductData
} = useProducts();

onMounted(() => {
  getProdukterData()
})

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
