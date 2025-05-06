<script setup>
import { ref, onMounted } from "vue";
import { broadcast } from "../composables";
import Notif from "../components/Notif.vue";

// Form dan UI state
const selectedGroup = ref("");
const message = ref("");
const isLoading = ref(false);
const isSent = ref(false);
const errorMessage = ref("");
const token = ref("");

// Notifikasi state
const notif = ref({
    message: "",
    status: true, // true = success, false = error
    id: 0
});

// Grup WA
const groups = [
    { id: "120363319945608143@g.us", name: "Grup Kelas IF 2D Pagi" },
    { id: "120363324737971526@g.us", name: "Grup Kelas IF 2D COWOK" },
    { id: "120363030494134340@g.us", name: "DEMO TESTING" },
];

// Modal peringatan state
const showWarningModal = ref(false);

onMounted(() => {
    // Cek apakah modal sudah pernah ditampilkan sebelumnya
    if (!sessionStorage.getItem("warningModalShown")) {
        // Jika belum, tampilkan modal
        showWarningModal.value = true;
        // Simpan status bahwa modal sudah ditampilkan
        sessionStorage.setItem("warningModalShown", "true");
    }
});

const sendBroadcast = async () => {
    isLoading.value = true;

    try {
        if (!selectedGroup.value) {
            errorMessage.value = "Silakan pilih grup";
            return;
        }
        if (token.value !== "ifdsolid" && token.value !== "menyala" || !token.value.trim()) {
            notif.value = {
                message: `Token Salah`,
                status: false,
                id: Date.now()
            }
            return;
        }

        if (!message.value.trim()) {
            errorMessage.value = "Pesan tidak boleh kosong";
            return;
        }

        const response = await broadcast(selectedGroup.value, message.value);
        notif.value = {
            message: `Berhasil, ${response}` || "Pesan broadcast berhasil dikirim!",
            status: true,
            id: Date.now()
        };

        selectedGroup.value = "";
        token.value = '';
        message.value = "";
        isSent.value = true;

        setTimeout(() => {
            isSent.value = false;
        }, 3000);
    } catch (error) {
        notif.value = {
            message: `Gagal mengirim: ${error.message}`,
            status: false,
            id: Date.now()
        };
    } finally {
        isLoading.value = false;
    }

    errorMessage.value = "";
};
</script>

<template>
    <!-- Komponen Notifikasi -->
    <Notif :notif="notif" />
    
    <!-- Form Broadcast -->
    <div class="bg-white shadow-md rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">Fitur Broadcast</h1>
    
        <div class="space-y-6">
            <div>
                <!-- Pilih Grup -->
                <div class="mb-4">
                    <label for="group" class="block text-sm font-medium text-gray-700 mb-2">Pilih Grup</label>
                    <select v-model="selectedGroup" id="group" class="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="" disabled>-- Pilih Grup --</option>
                    <option v-for="group in groups" :key="group.id" :value="group.id">
                      {{ group.name }}
                    </option>
                  </select>
                </div>
                <div class="mb-4">
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Token Akses</label>
                    <input v-model="token" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Masukkan Token untuk Broadcast .....">
                </div>
                <!-- Pesan -->
                <div class="mb-6">
                    <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Pesan Broadcast</label>
                    <textarea v-model="message" id="message" rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik pesan broadcast..."></textarea>
                </div>
    
                <!-- Error -->
                <div v-if="errorMessage" class="mb-4 text-red-600 text-sm">
                    {{ errorMessage }}
                </div>
    
                <!-- Tombol -->
                <button @click="sendBroadcast" class="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center" :disabled="isLoading">
                  <svg
                    v-if="isLoading"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span v-if="isLoading">Mengirim...</span>
                  <span v-else-if="isSent">Terkirim!</span>
                  <span v-else>Kirim Broadcast</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Peringatan -->
    <div v-if="showWarningModal" class="flex justify-center items-center inset-0 bg-black/50 backdrop-blur-sm z-40 fixed">
        <div class="bg-white p-3 rounded">
            <h1 class="font-bold">Peringatan!!!</h1>
            <p>Fitur ini khusus yang punya token akses saja!</p>
            <button type="button" @click="showWarningModal = false" class="bg-emerald-300 rounded text-sm py-2 px-3 mt-2">OK BOSSS</button>
        </div>
    </div>
</template>
