const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
console.log(playBtn);
const nextBtn = document.getElementById('next')

// check is playing
let isPlaying = false;

// play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')

    music.play();
}

// pause 
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'play')

    music.pause();
}

// play of pause event listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))