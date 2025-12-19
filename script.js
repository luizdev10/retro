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

let counter = 0;
const size = 100; 

function nextSlide() {
    if (counter >= carouselImages.length - 1) {
        counter = -1; 
    }
    counter++;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
}

function prevSlide() {
    if (counter <= 0) {
        counter = carouselImages.length;
    }
    counter--;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + '%)';
}


nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);


let autoPlay = setInterval(nextSlide, 2500);


const container = document.querySelector('.carousel-container');

container.addEventListener('mouseenter', () => {
    clearInterval(autoPlay); 
});

container.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 3000);
});


let currentAudio = null;

const observerOptions = {
    threshold: 0.6
};

const musicObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const audioSrc = entry.target.getAttribute('data-audio');
            if (audioSrc) {
                playSectionMusic(audioSrc);
            }
        }
    });
}, observerOptions);

function playSectionMusic(src) {

    if (currentAudio && currentAudio.src.includes(src)) return;


    if (currentAudio) {
        let oldAudio = currentAudio;
        fadeOutAndStop(oldAudio);
    }

    currentAudio = new Audio(src);
    currentAudio.volume = 0;
    currentAudio.play().catch(e => console.log("O navegador bloqueou o autoplay. O usuário precisa interagir com a página primeiro."));
    

    fadeIn(currentAudio);
}


function fadeIn(audio) {
    let vol = 0;
    let interval = setInterval(() => {
        if (vol < 0.5) {
            vol += 0.05;
            audio.volume = vol;
        } else {
            clearInterval(interval);
        }
    }, 100);
}


function fadeOutAndStop(audio) {
    let vol = audio.volume;
    let interval = setInterval(() => {
        if (vol > 0.05) {
            vol -= 0.05;
            audio.volume = vol;
        } else {
            audio.pause();
            clearInterval(interval);
        }
    }, 100);
}


document.querySelectorAll('section').forEach(section => {
    musicObserver.observe(section);
});