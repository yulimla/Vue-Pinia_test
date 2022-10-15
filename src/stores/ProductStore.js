import { defineStore } from "pinia";
// import products from "@/data/products.json"
export const useProductsStrore = defineStore("ProductStore", {
    state: () => {
        return {
            products: []
        };
    },

    //action
    actions: {
        async fill() {
            this.products = (await
                import ("@/data/products.json")).default;

            // fetch by axios 
            // this.products = (await axios.get('some/end/point')).data
        }
    }

})