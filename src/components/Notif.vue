<script setup>
import { ref, watch } from 'vue'

// Ambil props dari parent
const props = defineProps({
  notif: {
    type: Object,
    default: () => ({
      message: '',
      status: true, // true = success, false = error
      id: 0
    })
  }
})

const localNotif = ref('')
const statusNotif = ref(true)

// Watch ID agar setiap perubahan trigger animasi & tampilan
watch(() => props.notif.id, (newId) => {
  if (newId) {
    localNotif.value = props.notif.message
    statusNotif.value = props.notif.status

    // Auto close setelah 3 detik
    setTimeout(() => {
      localNotif.value = ''
    }, 5000)
  }
})
</script>

<template>
  <div
    v-if="localNotif"
    class="z-[9999] fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
  >
    <div
      class="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
    >
      <div class="flex items-center gap-4">
        <!-- Ikon dinamis -->
        <svg
          v-if="statusNotif"
          class="w-8 h-8 text-green-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg
          v-else
          class="w-8 h-8 text-red-500 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <p class="text-gray-800 text-lg font-medium">{{ localNotif }}</p>
      </div>
      <div class="flex justify-center mt-6">
        <button
          @click="localNotif = ''"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
