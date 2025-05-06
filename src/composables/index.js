import axios from "axios";

const url = 'https://8da6b97b0da6b2c4373f331d8a4be5a1.serveo.net'

export async function getStat() {
    try {
        await axios.get(`${url}/api/test`);
        return true;
    } catch (error) {
        return false;
    }
};
export async function kirimPesan(nomor, pesan) {
    try {
        const response = await axios.post(`${url}/api/kirim`, {
            nomor: nomor,
            pesan: pesan
        });
        return response.message
    } catch (error) {
        return error
    }
}
export async function getSaran() {
    try {
        const response = await axios.get(`${url}/api/saran`);
        return response.data; // Mengembalikan data dari respons
    } catch (error) {
        console.error(error); 
        return null; 
    }
}
export async function kirimSaran(nama, no_wa, pesan) {
    try {
        const response = await axios.post(`${url}/api/kirimsaran`, {
            nama: nama,
            pesan: pesan,
            no_wa: no_wa
        });
        return response.data.message
    } catch (error) {
        return {message: "gagal"}   
    }
}

export async function broadcast(tujuan, pesan) {
    try {
        const response = await axios.post(`${url}/api/broadcast`, {
            tujuan: tujuan,
            pesan: pesan
        });
        return response.data.message
    } catch (error) {
        return error
    }
}



