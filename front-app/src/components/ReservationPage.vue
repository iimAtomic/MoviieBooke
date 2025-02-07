<template>
  <div class="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Mes Réservations</h2>

    <!-- Formulaire de réservation -->
    <form @submit.prevent="createReservation" class="mb-6">
      <div class="mb-4">
        <label for="movieId" class="block text-gray-700 font-semibold">ID du Film:</label>
        <input v-model="movieId" type="text" id="movieId" required class="w-full p-2 border rounded" />
      </div>

      <div class="mb-4">
        <label for="reservationSlot" class="block text-gray-700 font-semibold">Créneau de Réservation:</label>
        <input v-model="reservationSlot" type="datetime-local" id="reservationSlot" required class="w-full p-2 border rounded" />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Réserver
      </button>
    </form>

    <!-- Message d'information -->
    <p v-if="message" :class="messageType" class="p-2 text-center rounded mb-4">
      {{ message }}
    </p>

    <!-- Loader -->
    <div v-if="loading" class="text-center text-gray-500">Chargement des réservations...</div>

    <!-- Liste des réservations -->
    <h3 class="text-xl font-bold mb-3">Liste des Réservations</h3>
    <ul v-if="reservations.length > 0">
      <li v-for="reservation in reservations" :key="reservation.id" class="bg-gray-100 p-4 mb-3 rounded flex justify-between items-center">
        <div>
          <strong>{{ reservation.movieTitle }}</strong> - {{ new Date(reservation.reservationSlot).toLocaleString() }}
        </div>
        <button @click="cancelReservation(reservation.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Annuler
        </button>
      </li>
    </ul>
    <p v-else class="text-gray-500">Aucune réservation trouvée.</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const reservations = ref([]);
    const movieId = ref('');
    const reservationSlot = ref('');
    const message = ref('');
    const messageType = ref('');
    const loading = ref(false);

    const fetchReservations = async () => {
      loading.value = true;
      try {
        const response = await axios.get('http://localhost:3000/reservations', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        reservations.value = response.data;
      } catch (err) {
        message.value = 'Erreur lors du chargement des réservations';
        messageType.value = 'text-red-500';
      } finally {
        loading.value = false;
      }
    };

    const createReservation = async () => {
      try {
        await axios.post(
            'http://localhost:3000/reservations',
            { movieId: movieId.value, reservationSlot: reservationSlot.value },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        message.value = 'Réservation confirmée !';
        messageType.value = 'text-green-500';
        fetchReservations();
      } catch (err) {
        message.value = 'Erreur lors de la création de la réservation';
        messageType.value = 'text-red-500';
      }
    };

    const cancelReservation = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/reservations/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchReservations();
      } catch (err) {
        message.value = 'Erreur lors de l\'annulation de la réservation';
        messageType.value = 'text-red-500';
      }
    };

    onMounted(() => {
      fetchReservations();
    });

    return {
      reservations,
      movieId,
      reservationSlot,
      message,
      messageType,
      loading,
      fetchReservations,
      createReservation,
      cancelReservation
    };
  }
};
</script>
