<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Connexion</h2>
      <form @submit.prevent="login" class="mt-4 space-y-4">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
            v-model="password"
            type="password"
            placeholder="Mote de passe"
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            type="submit"
            class="w-full py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Se connecter
        </button>
      </form>
      <p v-if="error" class="mt-4 text-sm text-red-500 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/home');
      } catch (err) {
        this.error = 'Identifiants incorrects';
      }
    }
  }
};
</script>
