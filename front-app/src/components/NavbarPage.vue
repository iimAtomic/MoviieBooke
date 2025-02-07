<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 class="text-xl font-bold">Cinéma Réservations</h1>
    <div>
      <router-link to="/home" class="mx-2 hover:text-gray-400">Accueil</router-link>
      <router-link to="/reservations" class="mx-2 hover:text-gray-400">Mes Réservations</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarPage',
};
</script>
