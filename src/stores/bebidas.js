import { defineStore } from "pinia";
import { ref } from "vue";
export const useBebidasStore = defineStore('bebidas', (() => {
    const categorias = ref([])
    return {
        categorias
    }
}))