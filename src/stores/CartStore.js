import { defineStore, acceptHMRUpdate } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUsersStore.js";
export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            items: useLocalStorage("CartStore:items", [])
        }
    },
    getters: {
        //alternatif
        countAlt: (state) => state.items.length,
        count() {
            return this.items.length
        },
        isEmpty: (state) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, (item) => item.name)
            const sorted = Object.keys(grouped).sort()
            let inOrder = {}
            sorted.forEach(key => inOrder[key] = grouped[key])
            return inOrder;
        },

        groupCount: (state) => (name) = (state.grouped[name] !== undefined) ? state.grouped[name].length : 0,
        total: state => state.items.reduce((p, c) => p + c.price, 0)
    },
    actions: {
        checkout() {
            const AuthUserStore = useAuthUserStore();
            alert(`${AuthUserStore.username} just bought ${this.count} items at a total of $${this.total}`)
        },
        groupCount1(name) {
            if (this.grouped[name] !== undefined) {
                return this.grouped[name].length
            }
            return 0
        },
        addItems(count, item) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({...item })
            }
        },
        clearItem(itemName) {
            this.items = this.items.filter((item) => item.name !== itemName)
        },
        setItemCount(item, count) {
            this.clearItem(item.name);
            this.addItems(count, item)
        }

    }
})

if (
    import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore,
        import.meta.hot))
}