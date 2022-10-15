<script setup>
import { ref, reactive } from 'vue'

import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductsStrore } from "@/stores/ProductStore.js";
import {useCartStore} from "@/stores/CartStore.js"
import AppButton from "@/components/AppButton.vue"
const productStore = useProductsStrore();
const cartStore = useCartStore();
const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));
const redo = () =>{
  const latestState = future.pop()
  if(!latestState) return;
  doingHistory.value = true
  history.push(latestState)
  cartStore.$state = JSON.parse(latestState)
  doingHistory.value = false
}
const undo = () =>{
  if(history.length===1)return;
  doingHistory.value = true;
  // history.pop();
  future.push(history.pop())
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
}
cartStore.$subscribe((mutation,state)=>{
  if(!doingHistory.value){
    history.push(JSON.stringify(state));
  }
})

cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
})=>{
  if(name === 'addItems'){
    after((result)=>{
      console.log(result);
    });
    onError((error)=>{
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

productStore.fill();
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton @click="redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product" @addToCart ="cartStore.addItems($event,product)"
      />
    </ul>
  </div>
</template>
