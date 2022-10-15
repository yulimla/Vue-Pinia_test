<script >
// imports
import { useAuthUserStore } from "@/stores/AuthUsersStore";
import { mapState, mapActions } from "pinia";
// import { mapWritableState } from "pinia"; //for editing mapstate
import CartWidget from './CartWidget.vue';
export default {
  components: { CartWidget },
  computed: {
    ...mapState(useAuthUserStore, {
      user : "username"
      // user : store => `Hello ${store.username}`
    })
  },
  methods: {
    ...mapActions(useAuthUserStore, ['visitCodefirst']),
  },
}
</script>

<template>
  <header class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')">
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div class="flex">
      <!-- <input v-model="user" type="text"/> -->
      <span class="mr-3" @click="visitCodefirst">{{user}}</span>
    <CartWidget />

    </div>
  </header>
</template>