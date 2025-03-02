import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { ref, watch, onMounted, computed } from "vue";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificaciones";

export const useFavoritosStore = defineStore('favoritos', () => {
    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()
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
        notificaciones.mostrar = true
        notificaciones.texto = 'Eliminado de favoritos.'

    }

    function handleClickFavorito() {
        if (existeFavorito(bebidas.receta.idDrink)) {
            eliminarFavorito()
        } else {
            agregarFavorito()
        }
        modal.modal = false;
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.receta)
        notificaciones.mostrar = true
        notificaciones.texto = 'Se agregó a favoritos.'
    }

    function existeFavorito(id) {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    const noFavoritos = computed(() => favoritos.value.length === 0)

    return {
        favoritos,
        noFavoritos,
        existeFavorito,
        handleClickFavorito
    }
})