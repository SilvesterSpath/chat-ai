<script setup lang="ts">
import robotImage from '../assets/robot.png';
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const loading = ref(false);
const error = ref('');

const createUser = () => {
  if (!name.value || !email.value) {
    error.value = 'Please enter your name and email';
    return;
  }

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <img :src="robotImage" alt="Robot" class="w-24 h-24 mx-auto mb-4" />
      <h1 class="text-2xl font-semibold mb-4 text-center">Welcome to Chat</h1>
      <input
        type="text"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus: outline-none"
        placeholder="Name"
        v-model="name"
      />
      <input
        type="email"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus: outline-none"
        placeholder="Email"
        v-model="email"
      />
      <button
        class="w-full p-2 bg-blue-500 text-white rounded-lg"
        :disabled="loading"
        @click="createUser"
      >
        {{ loading ? 'Loading...' : 'Start Chat' }}
      </button>
      <p class="text-red-500 text-center mt-2" v-if="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>
