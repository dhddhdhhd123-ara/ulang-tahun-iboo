const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

function toggleMusic() {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "⏸️ Pause Music";
        musicBtn.style.background = "#ff4a4a";
    } else {
        music.pause();
        musicBtn.innerHTML = "🎵 Play Music";
        musicBtn.style.background = "#00d2ff";
    }
}

document.addEventListener('click', function() {
    if (music.paused) {
        music.play().then(() => {
            musicBtn.innerHTML = "⏸️ Pause Music";
            musicBtn.style.background = "#ff4a4a";
        }).catch(err => console.log("Autoplay dihambat browser"));
    }
}, { once: true });

// ==========================================
// FEATURE 2: LOGIKA COUNTDOWN TIMER
// ==========================================
// Silakan atur tanggal ulang tahunnya di bawah ini (Format: Tahun, Bulan-1, Tanggal)
// Catatan: Bulan dimulai dari 0 (Januari=0, Juni=5, Desember=11)
const targetDate = new Date(2026, 5, 27, 0, 0, 0).getTime(); 

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "🎉 HBD! HARI SPESIALNYA SUDAH TIBA! 🎉";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = days + " Hari " + hours + " Jam " + minutes + " Menit " + seconds + " Detik ";
}, 1000);

// ==========================================
// FEATURE 3: SPAWN BALON OTOMATIS
// ==========================================
function spawnBalloons() {
    const balloonEmojis = ["🎈", "✨", "🎉", "🌟"];
    setInterval(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        
        balloon.style.left = Math.random() * 100 + "vw";
        const duration = 4 + Math.random() * 4;
        const drift = (Math.random() - 0.5) * 200;
        
        balloon.style.setProperty('--duration', `${duration}s`);
        balloon.style.setProperty('--drift', `${drift}px`);
        
        document.body.appendChild(balloon);
        setTimeout(() => { balloon.remove(); }, duration * 1000);
    }, 600);
}
spawnBalloons();

// ==========================================
// FEATURE 4 & 1: BUKA AMPLOP & TYPING EFFECT
// ==========================================
let isEnvelopeOpened = false;
function openEnvelope() {
    if (isEnvelopeOpened) return;
    isEnvelopeOpened = true;
    
    document.getElementById("envelope-hint").style.display = "none";
    document.querySelector(".envelope-wrapper").classList.add("open");
    
    // Mulai efek mengetik otomatis setelah amplop naik (delay 600ms)
    setTimeout(startTyping, 600);
}

const fullText = "di hari spesial ini, aku  mau bilang terimakasi sudah hadir di dunia ini. tetap lah menjadi eja yang aku kenal, jika nanti sudah mencapai semua keinginan kamu tetap lah rendah hati. semua proses pasti ada lika likunya tapi aku yakin kali ini sayang akan lolos aamiin. aku ada disini dan tetap disini, ga akan pergi meninggalkan mu. aku akan selalu nemenin kamu, love u sayang❤️ jangan pernah merasa sendiri yaaa. Happyy birthdayy! 💙";
let textIndex = 0;


function startTyping() {
    if (textIndex < fullText.length) {
        document.getElementById("typing-text").innerHTML += fullText.charAt(textIndex);
        textIndex++;
        setTimeout(startTyping, 50); // Kecepatan mengetik (50ms per huruf)
    } else {
        // Jika teks sudah selesai diketik, munculkan tombol kado
        document.getElementById("open-gift-section-btn").style.display = "inline-block";
    }
}

// ==========================================
// LOGIKA INTERAKSI KADO & HUJAN LOVE
// ==========================================
function showGiftSection() {
    document.getElementById("gift-container").style.display = "block";
    document.getElementById("open-gift-section-btn").style.display = "none";
}

function burstHearts(event) {
    document.getElementById("secret-message-btn").style.display = "inline-block";
    const heartCount = 35; 
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement("div");
        heart.className = "heart-particle";
        const heartTypes = ["❤️", "💖", "💝", "💘", "💙", "💕"];
        heart.innerText = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        const x = event.clientX || window.innerWidth / 2;
        const y = event.clientY || window.innerHeight / 2;
        heart.style.left = x + "px";
        heart.style.top = y + "px";
        
        const targetX = (Math.random() - 0.5) * 400;
        const targetY = (Math.random() - 0.7) * 400;
        const duration = 1 + Math.random() * 1.5;
        const randomRot = (Math.random() - 0.5) * 360;
        
        heart.style.setProperty('--tx', `${targetX}px`);
        heart.style.setProperty('--ty', `${targetY}px`);
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.setProperty('--rot', `${randomRot}deg`);
        
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, duration * 1000);
    }
}

function showFinalSurprise() {
    document.getElementById("final-surprise-text").style.display = "block";
    document.getElementById("secret-message-btn").style.display = "none";
    // Set posisi tombol No ke default di kanan tombol Yes
    resetNoButton();
}

// ==========================================
// FEATURE 5: TOMBOL JEBAKAN PRANK (KABUR)
// ==========================================
function flyButton() {
    const noBtn = document.getElementById("btn-no");
    // Acak posisi koordinat tombol agar menjauh di dalam area pertanyaan
    const maxWidth = 150; 
    const maxHeight = 80; 
    
    const randomX = (Math.random() - 0.5) * maxWidth;
    const randomY = (Math.random() - 0.5) * maxHeight;
    
    noBtn.style.left = `calc(50% + ${randomX}px)`;
    noBtn.style.top = `${randomY}px`;
}

function resetNoButton() {
    const noBtn = document.getElementById("btn-no");
    noBtn.style.left = "calc(50% + 50px)";
    noBtn.style.top = "0px";
}

function sayangBanget() {
    alert("Aww.. Sayang banget juga sama kamu! 🥰❤️ Semoga suka ya sama kejutannya!");
}

// LOGIKA POP-UP MEMORI (FOTO/VIDEO)
function openModal(imageArray, textContent, titleContent) {
    const modal = document.getElementById("myModal");
    const gridContainer = document.getElementById("modalPhotoGrid");
    document.getElementById("modalTitle").innerText = titleContent;
    document.getElementById("modalText").innerText = textContent;
    gridContainer.innerHTML = "";
    imageArray.forEach(function(src) {
        const imgTag = document.createElement("img");
        imgTag.src = src;
        gridContainer.appendChild(imgTag);
    });
    modal.style.display = "flex";
}

function openModalVideo(videoSrc, textContent, titleContent) {
    const modal = document.getElementById("myModal");
    const gridContainer = document.getElementById("modalPhotoGrid");
    document.getElementById("modalTitle").innerText = titleContent;
    document.getElementById("modalText").innerText = textContent;
    gridContainer.innerHTML = "";
    
    const videoTag = document.createElement("video");
    videoTag.src = videoSrc;
    videoTag.controls = true;
    videoTag.autoplay = true;
    videoTag.style.width = "100%";
    videoTag.style.borderRadius = "10px";
    videoTag.style.maxHeight = "350px";
    
    if (!music.paused) toggleMusic();
    
    gridContainer.appendChild(videoTag);
    modal.style.display = "flex";
}

function closeModal() {
    const gridContainer = document.getElementById("modalPhotoGrid");
    const videoElement = gridContainer.querySelector("video");
    if (videoElement) {
        videoElement.pause();
        videoElement.src = "";
    }
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) closeModal();
}