// BRIDGE SYSTEM - PENGHUBUNG TAB & DASHBOARD
// File ini berfungsi menampilkan status TAB READY tanpa mengubah Dashboard utama

(function() {
    // 1. Buat elemen tampilan (Box Status) secara otomatis di Dashboard
    const container = document.createElement('div');
    container.id = 'status-bridge-container';
    container.style = "position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #112240; border: 1px solid #64ffda; padding: 15px; border-radius: 10px; color: white; box-shadow: 0 0 20px rgba(0,0,0,0.5); max-width: 250px; font-family: sans-serif;";
    container.innerHTML = `<h4 style="margin:0 0 10px 0; color:#64ffda; font-size:14px;">📡 Tab Connection Status</h4><div id="bridge-list" style="display:grid; grid-template-columns: 1fr 1fr; gap:5px; font-size:11px;"></div>`;
    
    document.body.appendChild(container);

    // 2. Fungsi untuk mengecek LocalStorage secara realtime
    function refreshBridgeStatus() {
        const list = document.getElementById('bridge-list');
        if (!list) return;

        let html = "";
        let count = 0;

        for (let i = 0; i < 30; i++) {
            const status = localStorage.getItem(`status_tab_${i}`);
            if (status === 'READY') {
                count++;
                html += `<div style="background:#0a192f; padding:5px; border-radius:3px; border:1px solid #64ffda; text-align:center;">Tab ${i} ✅</div>`;
            }
        }

        list.innerHTML = html || "<span style='color:#8892b0; grid-column: span 2;'>Menunggu Tab...</span>";
        
        // Sembunyikan jika tidak ada tab yang aktif (opsional)
        container.style.display = count > 0 ? "block" : "block";
    }

    // Jalankan pengecekan setiap 1.5 detik
    setInterval(refreshBridgeStatus, 1500);

})();
