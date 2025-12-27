
document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const container = document.querySelector('.carousel-container');

    let counter = 0;
    const size = 100;

    function nextSlide() {

        if (counter >= carouselImages.length - 1) {
            counter = -1;
        }
        counter++;
        carouselSlide.style.transition = "transform 0.6s ease-in-out";
        carouselSlide.style.transform = `translateX(${-size * counter}%)`;
    }

    function prevSlide() {
        if (!carouselSlide) return;
        if (counter <= 0) {
            counter = carouselImages.length;
        }
        counter--;
        carouselSlide.style.transition = "transform 0.6s ease-in-out";
        carouselSlide.style.transform = `translateX(${-size * counter}%)`;
    }


    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    let autoPlay = setInterval(nextSlide, 3000);

    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(autoPlay));
        container.addEventListener('mouseleave', () => {
            autoPlay = setInterval(nextSlide, 3000);
        });
    }


    const btnIniciar = document.getElementById('btn-iniciar');
    const overlay = document.getElementById('overlay');
    const musica = document.getElementById('musica-tema');
    const musicControl = document.getElementById('music-control');

    if (btnIniciar) {
        btnIniciar.addEventListener('click', () => {
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 1000);
            }

            if (musica) {
                musica.play().catch(error => console.log("Erro ao tocar:", error));
                musica.volume = 0.2;
            }
        });
    }

    if (musicControl && musica) {
        musicControl.addEventListener('click', () => {
            if (musica.paused) {
                musica.play();
                musicControl.innerText = "🔊";
            } else {
                musica.pause();
                musicControl.innerText = "🔈";
            }
        });
    }
});