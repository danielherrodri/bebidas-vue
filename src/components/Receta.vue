<script setup>
defineProps(
    {
        receta: {
            type: Object
        }
    }
)
</script>

<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img class="hover:scale-125 transition-transform hover:rotate-2" :alt="'Imagen de ' + receta.strDrink" :src="receta.strDrinkThumb" />
        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold">{{ receta.strDrink }}</h2>
            <button type="button" class="bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg hover:bg-orange-300">>Ver Receta</button>
        </div>
    </div>
</template>
