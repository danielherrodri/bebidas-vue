import { defineStore } from "pinia";
import { ref, onMounted, reactive } from "vue";
import APIService from "../services/APIService";
export const useBebidasStore = defineStore('bebidas', (() => {
    const categorias = ref([]);

    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })

    onMounted(async () => {
        const { data: { drinks } } = await APIService.obtenerCategorias()
        categorias.value = drinks;
    });

    function obtenerRecetas() {

    }

    return {
        categorias,
        busqueda,
        obtenerRecetas
    }
}))