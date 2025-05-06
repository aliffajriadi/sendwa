<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Compute active item based on current route
const activeItem = computed(() => {
  const path = route.path;
  if (path === '/' || path.startsWith('/home')) return 'home';
  if (path.startsWith('/confess')) return 'confess';
  if (path.startsWith('/broadcast')) return 'broadcast';
  return 'home'; // Default to home if no match
});

// Function to handle navigation item click
const handleNavClick = (item) => {
  const routes = {
    'home': '/',
    'confess': '/confess',
    'broadcast': '/broadcast'
  };
  router.push(routes[item]);
};
</script>

<template>
  <div class="fixed bottom-0 left-0 right-0 flex justify-center z-30">
    <nav class="flex bg-white rounded-full px-6 py-3 shadow-lg gap-8">
      <div 
        class="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out gap-1"
        :class="activeItem === 'home' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'"
        @click="handleNavClick('home')"
      >
        <div class="w-6 h-6 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span class="text-xs font-medium">Home</span>
      </div>

      <div 
        class="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out gap-1"
        :class="activeItem === 'confess' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'"
        @click="handleNavClick('confess')"
      >
        <div class="w-6 h-6 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <span class="text-xs font-medium">Confess</span>
      </div>

      <div 
        class="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out gap-1"
        :class="activeItem === 'broadcast' ? 'text-blue-500 -translate-y-1' : 'text-slate-400'"
        @click="handleNavClick('broadcast')"
      >
        <div class="w-6 h-6 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m12 13 5-5"/>
            <circle cx="15" cy="10" r="1"/>
            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
            <path d="M7 21 12 3"/>
            <path d="m8 16 4-10"/>
          </svg>
        </div>
        <span class="text-xs font-medium">Broadcast</span>
      </div>
    </nav>
  </div>
</template>

<!-- No scoped style tag needed when using Tailwind CSS -->