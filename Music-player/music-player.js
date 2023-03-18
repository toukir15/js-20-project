const image = document.querySelector('img')
const title = document.getElementById('title')
const progressContainer = document.getElementById('progress__container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current__time')
const durationEl = document.getElementById('duration')
const artist = document.getElementById('artist')
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

// music 
const songs = [
    {
        name: 'Baarishien-Anuv-Jain',
        displayName: 'Baarishien',
        artist: 'Anuv Jain'
    },
    {
        name: 'Jo-Tu-Na-Mila-Asim-Azhar',
        displayName: 'Jo-Tu-Na-Mila',
        artist: 'Asim-Azhar'
    },
    {
        name: 'Khair-Mangdi-Neha-Bhasin-Harrdy-Sandhu',
        displayName: 'Khair-Mangdi',
        artist: 'Neha-Bhasin-Harrdy-Sandhu'
    },
    {
        name: 'Yeh-Aaina-Shreya-Ghoshal',
        displayName: 'Yeh-Aaina',
        artist: 'Shreya-Ghoshal'
    },
]

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

// DOM update 
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `audio/${song.name}.mp3`
    image.src = `images/${song.name}.jpg`
}

// current song 
let songIndex = 0;

// Previous song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex])
    playSong();
}

// next song 
function nextSong() {
    songIndex++;
    if (songIndex === songs.length) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    playSong();
}

// On load / select first song 
loadSong(songs[3])

// update progress bar & time 
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.setAttribute('value', `${progressPercent}`)
        // calculate for display duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay switching duration Element to avoid NaN 
        if (durationMinutes) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // calculate for display current 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }

}
// set progress bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// event listener 
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)