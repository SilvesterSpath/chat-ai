<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');

const emit = defineEmits(['send']);

const sendMessage = () => {
  if (!message.value.trim()) {
    return;
  }
  emit('send', message.value);
  message.value = '';
};
</script>

<template>
  <div class="p-4 bg-gray-800 flex">
    <input
      type="text"
      class="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
      v-model="message"
      placeholder="Type your message here..."
      @keyup.enter="sendMessage"
    />
    <button
      class="ml-2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      @click="sendMessage"
    >
      Send
    </button>
  </div>
</template>
