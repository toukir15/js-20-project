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
    music.play();
}

// pause 
function pauseSong() {
    isPlaying = false;
    music.pause();
}

// play of pause event listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))