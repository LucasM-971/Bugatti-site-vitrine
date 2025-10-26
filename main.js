document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
});

let lastScroll = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (currentScroll === 0) {
        // Si on est tout en haut de la page, le header redevient transparent
        header.style.opacity = "1";
        header.style.backdropFilter = "blur(0px)";
        header.style.background = "rgba(255, 255, 255, 0)";
    } else if (currentScroll < lastScroll && currentScroll > 50) {
        // Scroll vers le haut → Afficher le header avec flou
        header.style.opacity = "1";
        header.style.backdropFilter = "blur(80px)";
        header.style.background = "rgba(255, 255, 255, 0)";
        header.style.height = "40px"; // Augmente la hauteur quand le flou est actif

    } else if (currentScroll > lastScroll) {
        // Scroll vers le bas → Cacher le header
        header.style.opacity = "0";
        header.style.backdropFilter = "blur(0px)";
        header.style.background = "rgba(255, 255, 255, 0)";
    }

    lastScroll = currentScroll;
});

// Forcer le démarrage des vidéos et empêcher les interactions
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Forcer la lecture
        video.play().catch(function(error) {
            console.log('Autoplay failed:', error);
            document.addEventListener('click', function() {
                video.play();
            }, { once: true });
        });
        
        // Empêcher la pause par clic
        video.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            video.play();
        });
        
        // Empêcher la pause par clavier
        video.addEventListener('keydown', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Forcer la lecture si la vidéo est mise en pause
        video.addEventListener('pause', function() {
            setTimeout(() => {
                video.play();
            }, 100);
        });
        
        // Empêcher le menu contextuel
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
        
        // Désactiver les contrôles
        video.controls = false;
        video.disablePictureInPicture = true;
    });
});
