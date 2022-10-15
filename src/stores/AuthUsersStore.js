import { defineStore } from "pinia";
export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: "yulimla"
        }
    },
    // getters: {
    //     username: () => "yulimla"
    // }
    actions: {
        visitCodefirst() {
            window.open('https://codefirst.co.id/', '_blank')
        }
    }
})