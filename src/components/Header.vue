<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';
import { useNotificacionStore } from '@/stores/notificaciones';
const route = useRoute();
const store = useBebidasStore()
const notificaciones = useNotificacionStore()
const paginaInicio = computed(() => route.name === 'inicio')

const handleSubmit = () => {
    if (Object.values(store.busqueda).includes('')) {
        notificaciones.$patch({ texto: 'Todos los campos son obligatorios.', mostrar: true, error: true })
        return
    }
    store.obtenerRecetas()
}
</script>
<template>
    <header class="bg-slate-800" :class="{ header: paginaInicio }">
        <div class="mx-auto container px-5 py-16">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink :to="{ name: 'inicio' }">
                        <img src="/img/logo.svg" class="w-32" alt="logotipo" />
                    </RouterLink>
                </div>
                <nav class="flex text-white gap-4">
                    <RouterLink :to="{ name: 'inicio' }" class="uppercase font-bold" active-class="text-orange-500">
                        Inicio
                    </RouterLink>
                    <RouterLink :to="{ name: 'favoritos' }" class="uppercase font-bold" active-class="text-orange-500">
                        Favoritos
                    </RouterLink>
                </nav>
            </div>
            <form @submit.prevent="handleSubmit" v-if="paginaInicio"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6" action="">
                <div class="space-y-4">
                    <label class="block text-white uppercase font-extrabold text-lg" for="ingrediente">Nombre o
                        Ingredientes</label>
                    <input type="text" id="ingrediente" v-model="store.busqueda.nombre"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o ingrediente: ej. Vodka, Tequila, etc">
                </div>
                <div class="space-y-4">
                    <label class="block text-white uppercase font-extrabold text-lg" for="categoria">Categoría</label>
                    <select id="categoria" class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="store.busqueda.categoria">
                        <option value="">-- Seleccione --</option>
                        <option v-for="categoria in store.categorias" :value="categoria.strCategory">
                            {{ categoria.strCategory }}
                        </option>
                    </select>
                </div>
                <input type="submit" value="Buscar Recetas"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase">
            </form>
        </div>
    </header>
</template>
<style>
.header {
    background-image: url('/img/bg.jpg');
    background-size: cover;
    background-position: center;
}
</style>