import { ref, reactive } from 'vue'

export function piniaHistoryPlugin({ pinia, app, store, options }) {
    if (!options.historyEnabled) return;
    const history = reactive([]);
    const future = reactive([]);
    const doingHistory = ref(false);
    history.push(JSON.stringify(store.$state));

    store.$subscribe((mutation, state) => {
        if (!doingHistory.value) {
            history.push(JSON.stringify(state));
        }
    })
    return {
        redo: () => {
            const latestState = future.pop()
            if (!latestState) return;
            doingHistory.value = true
            history.push(latestState)
            store.$state = JSON.parse(latestState)
            doingHistory.value = false
        },
        undo: () => {
            if (history.length === 1) return;
            doingHistory.value = true;
            // history.pop();
            future.push(history.pop())
            store.$state = JSON.parse(history.at(-1));
            doingHistory.value = false;
        }
    }
}