<script setup>
import { getStat } from '../composables';
import { onMounted, ref } from 'vue';

const stat = ref(false);

const getFetch = async () => {
    stat.value = await getStat();
};

onMounted(()=>{
    getFetch();
});


</script>

<template>
  <div v-if="stat == false"
    class="z-50 fixed items-center flex justify-center flex-col inset-0 bg-black/50 backdrop-blur-sm">
    <div class="text-start bg-white rounded px-7 py-7 space-y-2">
      <p class="text-xl font-semibold">Duh Bot Nya Lagi <span class="bg-red-500 p-1 text-white rounded">Offline</span> </p>
      <p>Silahkan Contact Ke Nomor Berikut</p>
      <ol class="text-start list-disc pl-4">
        <li>0895-6037-92033 / Alif</li>
        <li>0896-3695-1323 / Rafif</li>
      </ol>
    </div>
  </div>
</template>
