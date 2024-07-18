import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { ref, watch, onMounted } from "vue";
export const useFavoritosStore = defineStore('favoritos', () => {
    const bebidas = useBebidasStore()
    const favoritos = ref([])

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    }, {
        deep: true
    })

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)
    }

    function handleClickFavorito() {
        if (existeFavorito(bebidas.receta.idDrink)) {
            eliminarFavorito()
        } else {
            agregarFavorito()

        }
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.receta)
    }

    function existeFavorito(id) {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    return {
        favoritos,
        existeFavorito,
        handleClickFavorito
    }
})