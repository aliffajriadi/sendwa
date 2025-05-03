(() => {
    async function getStatus() {
        const stat = document.getElementById('status');
        try {
            const response = await fetch('https://3f18-43-209-20-233.ngrok-free.app/api/test');
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Cek data yang diterima
                if (data && data.message) {
                    stat.innerHTML = `<p class="text-white bg-green-500 p-2 rounded">BOT ${data.message}</p>`;
                } else {
                    stat.innerHTML = `<p class="text-white bg-red-500 p-2 rounded">Data tidak valid</p>`;
                }
            } else {
                console.error('Response tidak OK', response.status);
                stat.innerHTML = `<p class="text-white bg-red-500 p-2 rounded">BOT Offline</p>`;
            }
        } catch (error) {
            console.error("Terjadi error saat fetch:", error);
            stat.innerHTML = `<p class="text-white bg-red-500 p-2 rounded">BOT Offline</p>`;
        }
    }

    getStatus();
})();



function getAkses() {
    const token = document.getElementById('akses').value;
    const modal = document.getElementsByClassName('akses')[0]; // ambil elemen pertama

    if (token === 'ifdsolid' || token === '123warna' || token === 'tugas') {
        modal.classList.add('hidden'); // sembunyikan modal
    } else {
        document.getElementById('notif').innerHTML =
            `<p class="bg-red-500 text-white p-3 rounded-lg font-semibold">"${token}" Token Salah, masukkan ulang</p>`;
    }
}

function showNotification(messageObj) {
    const notif = document.getElementById("notification");
    const notifContent = document.getElementById("notifContent");
    notifContent.textContent = JSON.stringify(messageObj, null, 2);
    notif.classList.remove("hidden", "fade-out");
    notif.classList.add("fade-in");

    setTimeout(() => {
      notif.classList.remove("fade-in");
      notif.classList.add("fade-out");
      setTimeout(() => notif.classList.add("hidden"), 500);
    }, 4000);
  }

  document.getElementById("formKirim").addEventListener("submit", async function(e) {
    e.preventDefault();
    const nomor = document.getElementById("nomor").value;
    const pesan = document.getElementById("pesan").value;

    try {
      const response = await fetch("https://3f18-43-209-20-233.ngrok-free.app/api/kirim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nomor, pesan })
      });
      const result = await response.json();
      showNotification(result);
    } catch (err) {
      showNotification({ error: "Gagal mengirim pesan." });
    }
  });

  document.getElementById("formBroadcast").addEventListener("submit", async function(e) {
    e.preventDefault();
    const tujuan = document.getElementById("tujuan").value;
    const pesan = document.getElementById("pesanBroadcast").value;

    try {
      const response = await fetch("https://3f18-43-209-20-233.ngrok-free.app/api/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tujuan, pesan })
      });
      const result = await response.json();
      showNotification(result);
    } catch (err) {
      showNotification({ error: "Gagal melakukan broadcast." });
    }
  });
