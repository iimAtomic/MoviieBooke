/* eslint-disable */
<template>
  <div>
    <h2>Mes Réservations</h2>
    <form @submit.prevent="createReservation">
      <label for="movieId">ID du Film:</label>
      <input v-model="movieId" type="text" id="movieId" required />

      <label for="reservationSlot">Créneau de Réservation:</label>
      <input v-model="reservationSlot" type="datetime-local" id="reservationSlot" required />

      <button type="submit">Réserver</button>
    </form>
    <p v-if="message">{{ message }}</p>

    <h3>Liste des Réservations</h3>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        {{ reservation.movieTitle }} - {{ new Date(reservation.reservationSlot).toLocaleString() }}
        <button @click="cancelReservation(reservation.id)">Annuler</button>
      </li>
    </ul>
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

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/reservations', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        reservations.value = response.data;
      } catch (err) {
        console.error('Erreur lors de la récupération des réservations', err);
      }
    };

    const createReservation = async () => {
      try {
        await axios.post(
            'http://localhost:3000/reservations',
            {
              movieId: movieId.value,
              reservationSlot: reservationSlot.value
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
        );
        message.value = 'Réservation confirmée';
        fetchReservations();
      } catch (err) {
        message.value = 'Erreur lors de la création de la réservation';
        console.error('Erreur lors de la création de la réservation', err);
      }
    };

    const cancelReservation = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/reservations/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        fetchReservations();
      } catch (err) {
        console.error('Erreur lors de l\'annulation de la réservation', err);
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
      fetchReservations,
      createReservation,
      cancelReservation
    };
  }
};
</script>
