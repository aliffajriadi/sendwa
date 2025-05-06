<script setup>
import { ref, onMounted } from 'vue';

// Modal state
const showModal = ref(true);

// Tanggal target untuk countdown (contoh: 30 hari dari sekarang)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 1);

// Format tanggal ke format yang lebih readable
const formattedDate = targetDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

// Fungsi untuk menutup modal
const closeModal = () => {
    showModal.value = false;
};
</script>

<template>
    <!-- Halaman Utama -->
    <section class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-16">
        <div class="max-w-3xl w-full text-center space-y-8">
            <!-- Icon -->
            <div class="mb-8">
                <div class="mx-auto h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
                </div>
            </div>
    
            <!-- Heading -->
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800">
                Coming Soon
            </h1>
    
            <!-- Subheading -->
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                Fitur dalam proses pengembangan
            </p>
    
            <!-- Launch Date -->
            <div class="mt-8">
                <p class="text-lg text-gray-700">
                    kemungkinan selesai: <span class="font-semibold">{{ formattedDate }}</span>
                </p>
            </div>
    
            <!-- Divider -->
            <div class="w-24 h-1 bg-blue-500 mx-auto my-8"></div>
    
    
        </div>
    </section>
    
    <!-- Modal Popup -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
            <!-- Close Button -->
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
    
            <!-- Modal Content -->
            <div class="text-center">
                <div class="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
                </div>
    
                <h3 class="text-xl font-bold text-gray-800 mb-2">maintain</h3>
                <p class="text-gray-600 mb-6">Sedang dalam proses pengerjaan</p>
                <button @click="closeModal" class="flex-1 bg-blue-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                OK LEEE
              </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>