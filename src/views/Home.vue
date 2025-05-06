<script setup>
import { onMounted, ref } from 'vue';
import { kirimPesan } from '../composables'; // pastikan path-nya sesuai
import { getStat } from '../composables';
import { getSaran } from '../composables';
import { kirimSaran } from '../composables';
import Notif from '../components/Notif.vue';

const nomor = ref('');
const pesan = ref('');
const loading = ref(false);
const notif = ref({
    message: "",
    status: true,
    id: 0
});

const submitForm = async () => {
    loading.value = true;
    try {
        await kirimPesan(nomor.value, pesan.value);
        notif.value = {
            message: "Pesan Berhasil DiKirim Ke Whatsapp",
            status: true,
            id: Date.now()
        }
        nomor.value = '';
    } catch (err) {
        notif.value = {
            message: "Terjadi Kesalahan Brooo",
            status: false,
            id: Date.now()
        }
    } finally {
        loading.value = false;
    }
};

const masukan = ref([]);
const countSaran = ref();

const getMasukan = async () => {
    const responsei = await getSaran()
    masukan.value = responsei.rows;
    countSaran.value = responsei.countTotalSaran;
};


const statbot = ref(false);

const statusBot = async () => {
    statbot.value = await getStat();
};

const showModal = ref(false);
const showFeedbackModal = ref(false);


// Feedback form data
const feedbackName = ref('');
const feedbackPhone = ref('');
const feedbackMessage = ref('');
const feedbackLoading = ref(false);

const submitFeedback = async () => {
    feedbackLoading.value = true;
    try {
        const responsee = await kirimSaran(feedbackName.value, feedbackPhone.value, feedbackMessage.value);
        notif.value = {
            message: `Terimakasih ${responsee}`,
            status: true,
            id: Date.now()
        }
        getMasukan();
        feedbackName.value = '';
        feedbackPhone.value = '';
        feedbackMessage.value = '';
        showFeedbackModal.value = false;
    } catch (err) {
        notif.value = {
            message: "Terjadi Kesalahan, coba nanti ya",
            status: false,
            id: Date.now()
        }
    } finally {
        feedbackLoading.value = false;
    }
};

onMounted(() => {
    getMasukan();
    statusBot();
});
</script>

<template>
    <Notif :notif="notif" />
    <section class="max-w-6xl mx-auto px-4 py-6">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h1 class="text-3xl font-bold mb-2">Web Whatsapp IFD Class</h1>
                <div class="flex items-center">
                    <p class="mr-3">Status BOT:
                        <span class="text-white font-semibold px-2 py-1 rounded-md" :class="statbot ? 'bg-green-500' : 'bg-red-500'">
                  {{ statbot ? 'ON' : 'OFF' }}
                </span>
                    </p>
                </div>
            </div>
            <div class="flex space-x-4 mt-4 md:mt-0">
                <button @click="showModal = true" class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              Kirim Pesan
            </button>
                <button @click="showFeedbackModal = true" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.828l-5.657-5.657a2 2 0 112.828-2.828l2.829 2.829" />
              </svg>
              Beri Masukan
            </button>
            </div>
        </div>
    
        <!-- Suggestions Section -->
        <div class="mt-12">
            <!-- Header -->
            <div class="text-center mb-10">
                <h2 class="text-2xl font-bold text-gray-800 mb-2 inline-block relative">
                    <span class="bg-gradient-to-r from-amber-500 to-green-500 bg-clip-text text-transparent">List Saran</span>
                    <div class="absolute w-full h-1 bg-gradient-to-r from-amber-500 to-green-500 bottom-0 left-0 rounded-full"></div>
                </h2>
                <p class="text-gray-600 max-w-2xl mx-auto">Berikut adalah saran dan masukan untuk aplikasi gabut ini</p>
            </div>
            <p class="text-gray-600 max-w-2xl text-start mx-auto">Total Semua Saran: {{ countSaran }}/15</p>
    
            <!-- Suggestion Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-6 space-y-6 sm:space-y-0">
                <div v-for="item in masukan" :key="item.id" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition duration-300">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="flex-shrink-0 bg-gradient-to-br from-amber-50 to-green-50 flex items-center justify-center w-24 h-24">
                            <div class="text-amber-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" 
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                            </div>
                        </div>
                        <!-- Content -->
                        <div class="p-4 flex-1">
                            <h3 class="text-lg font-medium text-gray-800">{{ item.nama }}</h3>
                            <p class="text-gray-600 flex items-center mt-1 text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg> {{ item.no_wa }}
                            </p>
                            <p class="text-gray-700 mt-2 text-sm">{{ item.pesan }}</p>
                            <div class="mt-2 text-xs text-gray-500 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> {{ item.dibuat }}
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- Empty state - will show when saranList is empty -->
                <div v-if="masukan.length === 0" class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-10 text-center col-span-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
                    <h3 class="mt-4 text-lg font-medium text-gray-800">Belum Ada Saran</h3>
                    <p class="mt-2 text-gray-500">Saat ini belum ada saran atau masukan yang diterima.</p>
                </div>
            </div>
        </div>
    
        <!-- Modal for sending message -->
        <div v-if="showModal" class="z-40 fixed inset-0 flex justify-center bg-black/50 items-center backdrop-blur-sm">
            <form @submit.prevent="submitForm" class="bg-white zoom-in p-6 rounded-xl shadow-lg space-y-4 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-2xl font-bold text-gray-800">Kirim Pesan Langsung</p>
                    <button type="button" @click="showModal = false" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
                </div>
    
                <div>
                    <label for="nomor" class="block font-medium text-gray-700">Nomor Tujuan (contoh: 628123456789)</label>
                    <input type="text" pattern="\d*" maxlength="15" id="nomor" v-model="nomor" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
    
                <div>
                    <label for="pesan" class="block font-medium text-gray-700">Pesan:</label>
                    <textarea id="pesan" v-model="pesan" rows="4" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
                </div>
    
                <div class="flex gap-3 pt-2">
                    <button type="submit" :disabled="loading" class="bg-amber-500 text-white px-5 py-2 rounded-lg hover:bg-amber-600 transition disabled:opacity-50 flex-1">
                {{ loading ? 'Mengirim...' : 'Kirim' }}
              </button>
                    <button type="button" @click="showModal = false" class="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
                Batal  
              </button>
                </div>
            </form>
        </div>
    
        <!-- Modal for feedback form -->
        <div v-if="showFeedbackModal" class="z-40 fixed inset-0 flex justify-center bg-black/50 items-center backdrop-blur-sm">
            <form @submit.prevent="submitFeedback" class="bg-white zoom-in p-6 rounded-xl shadow-lg space-y-4 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-2">
                    <p class="text-2xl font-bold text-gray-800">Beri Masukan & Saran</p>
                    <button type="button" @click="showFeedbackModal = false" class="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
                </div>
    
                <div>
                    <label for="feedbackName" class="block font-medium text-gray-700">Nama</label>
                    <input type="text" id="feedbackName" v-model="feedbackName" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
    
                <div>
                    <label for="feedbackPhone" class="block font-medium text-gray-700">Nomor HP (contoh: +6281234567890)</label>
                    <input type="text" id="feedbackPhone" v-model="feedbackPhone" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
                </div>
    
                <div>
                    <label for="feedbackMessage" class="block font-medium text-gray-700">Pesan (maks. 130 karakter)</label>
                    <textarea id="feedbackMessage" v-model="feedbackMessage" rows="4" maxlength="130" required class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
                    <p class="text-sm text-gray-500 mt-1">{{ feedbackMessage.length }}/130 karakter</p>
                </div>
    
                <div class="flex gap-3 pt-2">
                    <button type="submit" :disabled="feedbackLoading" class="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 flex-1">
                {{ feedbackLoading ? 'Mengirim...' : 'Kirim' }}
              </button>
                    <button type="button" @click="showFeedbackModal = false" class="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 transition">
                Batal
              </button>
                </div>
            </form>
        </div>
    </section>
</template>

<style>
@keyframes zoomIn {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes zoomOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        opacity: 0;
        transform: scale(0.8);
    }
}

.zoom-in {
    animation: zoomIn 0.3s ease-out forwards;
}

.zoom-out {
    animation: zoomOut 0.3s ease-in forwards;
}
</style>