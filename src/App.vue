<script setup>

import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductsStrore } from "@/stores/ProductStore.js";
import { useCartStore } from "@/stores/CartStore.js"
import AppButton from "@/components/AppButton.vue"
const productStore = useProductsStrore();
const cartStore = useCartStore();

cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after((result) => {
      console.log(result);
    });
    onError((error) => {
      console.log("hello error:", error.message);
    })
  }
})

productStore.fill();

// const addToCart = (count, product)=>{
//   count = parseInt(count)
//   cartStore.$patch(state =>{
//     for (let index = 0; index < count; index++) {
//       state.items.push(product)
//     }
//   })
// }
// alternatif use storeToRefs by pinia

// import { storeToRefs } from "pinia";
// const { products } = storeToRefs(useProductsStrore());

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event,product)" />
    </ul>
  </div>
</template>
