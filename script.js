console.log("welcome raghav");
//Intialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songplay = document.getElementById('play');
let songs = [
    {songName:"Sukoon",filepath: "songs/1.mp3" , coverpath:"covers/1.jpeg"},
    {songName:"Kalle Kalle",filepath: "songs/2.mp3" , coverpath:"covers/2.jpg"},
    {songName:"Pehle Bhi Main - Animal 128 Kbps",filepath: "songs/3.mp3" , coverpath:"covers/3.jpg"},
    {songName:"Udaarian",filepath: "songs/4.mp3" , coverpath:"covers/4.jpg"},
    {songName:"Duniyaa-Luka Chuppi 128 Kbps",filepath: "songs/5.mp3" , coverpath:"covers/5.jpg"},
    {songName:"Waalian",filepath: "songs/6.mp3" , coverpath:"covers/6.jpg"},
]
songItem.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = audioElement.duration;
})
// audioElement.play();

//Handle play /pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
        audioElement.addEventListener();
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
        
    }
});

//Listen to events
//time update event
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value =  progress;
});
myProgressBar.addEventListener('change', () => {
    requestAnimationFrame(() => {
      audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
      console.log(audioElement.currentTime, 'raghav');
    });
  });
  const makeAllplays =()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-circle-play');
      });
  }
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllplays();
        songIndex = parseInt(e.target.id);
        if(audioElement.paused){
            e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause-circle');
        audioElement.src =`songs/${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        myProgressBar.value = 0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
        }
        else{
            e.target.classList.remove('fa-pause-circle');
        e.target.classList.add('fa-circle-play');
        audioElement.src =`songs/${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.pause();
        gif.style.opacity=1;
        myProgressBar.value = 0;
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-circle-play');
        }
        // if(audioElement.paused){
        //     e.target.classList.remove('fa-pause-circle');
        //     e.target.classList.add('fa-circle-play');
        // }
        masterPlay.addEventListener('click',()=>{
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-circle-play');
        })
    })
  });
  document.getElementById('forward').addEventListener( 'click',()=>{
    if(songIndex>5){
        songIndex = 1;
    }
    else{
        songIndex+=1;
    }
    audioElement.src =`songs/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex-1].songName;

        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        myProgressBar.value = 0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause-circle');
  })
  document.getElementById('previous').addEventListener( 'click',()=>{
    if(songIndex<=1){
        songIndex = 6;
    }
    else{
        songIndex-=1;
    }
    audioElement.src =`songs/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex-1].songName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        // masterPlay.classList.remove('fa-circle-play');
        // masterPlay.classList.add('fa-pause-circle');
  })
