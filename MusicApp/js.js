const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector("img"),
    musicTitle = wrapper.querySelector(".name"),
    musicArtist = wrapper.querySelector(".artist"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    mainaudio = wrapper.querySelector("#main-audio"),
    progressarea = wrapper.querySelector(".progress-area"),
    progressbar = wrapper.querySelector(".progress-bar")
;
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
});

function loadMusic(indexNum){
    musicTitle.innerText = allMusic[indexNum - 1].name;
    musicArtist.innerText = allMusic[indexNum - 1].artist;
    musicImg.src = `assets/images/${allMusic[indexNum - 1].src}.jpg`;
    mainaudio.src = `assets/songs/${allMusic[indexNum - 1].src}.mp3`;
}

function playMusic(){
    wrapper.classList.add("paused");
    musicImg.classList.add('rotate');
    playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    mainaudio.play();
}

function pauseMusic(){
    wrapper.classList.remove("paused");
    musicImg.classList.remove('rotate');
    playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    mainaudio.pause();
}

function prevMusic(){
    musicIndex--;
    musicIndex < 1 ?musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}
function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

playPauseBtn.addEventListener("click", () =>{
    const isMusicplay = wrapper.classList.contains("paused");
    isMusicplay ? pauseMusic() : playMusic();
});
prevBtn.addEventListener("click", () =>{
    prevMusic();
});
nextBtn.addEventListener("click", () =>{
    nextMusic();
})
mainaudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration)*100;
    progressbar.style.width = `${progressWidth}%`;
    
    let musicCurrentTime = wrapper.querySelector(".current-time"),
        musicDuration = wrapper.querySelector(".max-duration");
    mainaudio.addEventListener("loadeddata", () => {
        let mainAdDuration = mainaudio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if(totalSec <10){
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec <10){
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressarea.addEventListener("click", (e) =>{
    let progressWidth = progressarea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = mainaudio.duration;

    mainaudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

mainaudio.addEventListener("ended", () => {
    nextMusic();
});
