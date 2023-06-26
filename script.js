let allSongs= [
    {songName:"Heat Waves", filePath:`./song1/1.mp3`, coverPath:`./image1/1.jpg`},
    {songName:"Dusk Till Down", filePath:`./song1/2.mp3`, coverPath: `./image1/2.jpg`},
    {songName: "Waste", filePath:`./song1/3.mp3`, coverPath: `./image1/3.jpg`},
    {songName: "Royality", filePath:`./song1/4.mp3`, coverPath:`./image1/4.jpg`},
    {songName: "Faded", filePath:`./song1/5.mp3`, coverPath:`./image1/5.jpg`},
    {songName:"Faded 2", filePath:`./song1/6.mp3`, coverPath:`./image1/6.jpg`},
    {songName:"Let Me Down Slowly", filePath:`./song1/7.mp3`, coverPath: `./image1/7.jpg`},
    {songName: "Into Your Arms", filePath:`./song1/8.mp3`, coverPath: `./image1/8.jpg`},
    {songName: "Shape Of You", filePath:`./song1/9.mp3`, coverPath:`./image1/9.jpg`},
    {songName: "Don't Talk Anymore", filePath:`./song1/10.mp3`, coverPath:`./image1/10.jpg`},
    {songName:"Calm Down", filePath:`./song1/11.mp3`, coverPath:`./image1/11.jpg`},
    {songName: "Under Influence", filePath:`./song1/12.mp3`, coverPath:`./image1/12.jpg`},
    {songName: "Star Boy", filePath:`./song1/13.mp3`, coverPath:`./image1/13.jpg`},
]
let musicimg=document.getElementsByClassName('musicimg');
let musicname=document.getElementsByClassName('musicname');
let duration=document.getElementsByClassName('duration');
let slider=document.getElementById('slider');
let starttime=document.getElementById('starttime');
let endtime=document.getElementById('endtime');
let playmusicname=document.getElementById('playmusicname')
// let bars=document.getElementById('bars')
// let ullist=document.getElementById('ullist')

let gif=document.getElementById('gif');
for(let i=0;i<allSongs.length;i++){
  musicimg[i].src=allSongs[i].coverPath;
  musicname[i].innerText=allSongs[i].songName 
  let newaudio=new Audio(allSongs[i].filePath);
  newaudio.onloadedmetadata=()=>{
        let a=(parseFloat(newaudio.duration/60).toFixed(2)).split(".")
        let min=a[0];
        let second=Math.round((a[1]*60)/100)<10?"0"+Math.round((a[1]*60)/100):Math.round((a[1]*60)/100);
        duration[i].innerText=`${min}:${second}`
      }
}
//main logic -----------------------------------------
let musicindex=1
let music=new Audio();
// music.onloadeddata=()=>{
//     console.log(music.duration)
// }
music.src=`./song1/${musicindex}.mp3`
const prev=document.getElementById('prev')
const play=document.getElementById('play')
const next=document.getElementById('next')
let eachplay=document.getElementsByClassName('eachplay');
let makeallforplay=()=>{
  Array.from(eachplay).forEach((element)=>{
        if(element.classList.contains('fa-circle-pause')){
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play')
      }      
    })
}
Array.from(eachplay).forEach((element,index)=>{
  element.addEventListener('click',()=>{
    if(element.classList.contains('fa-circle-play')){
      makeallforplay();
        element.classList.remove('fa-circle-play')
        element.classList.add('fa-circle-pause')
        musicindex=index+1;
        music.src=`./song1/${musicindex}.mp3`; music.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause')
        gif.style.width='30px'
        gif.style.opacity="1"
        playmusicname.innerText=allSongs[musicindex-1].songName;
      }else{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
        music.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play')
        gif.style.width='0px'
        gif.style.opacity="0"
      }
    })
  })
  //  Play Button------
  play.addEventListener('click',(e)=>{
    if(play.classList.contains('fa-play')){
    play.classList.remove('fa-play');
    play.classList.add('fa-pause')
    eachplay[musicindex-1].classList.add('fa-circle-pause')
    music.play();   
    gif.style.width='30px'
    gif.style.opacity="1"
    playmusicname.innerText=allSongs[musicindex-1].songName;
  }else{
    play.classList.remove('fa-pause');
    play.classList.add('fa-play')
    music.pause();
    eachplay[musicindex-1].classList.remove('fa-circle-pause');
    eachplay[musicindex-1].classList.add('fa-circle-play');
    gif.style.width='0px'
    gif.style.opacity="0"   
  }
})
//Prev Button------
prev.addEventListener('click',()=>{
  musicindex<=1?musicindex=13:musicindex-=1;
  music.src=`./song1/${musicindex}.mp3`;
  music.play();
  gif.style.width='30px'
  gif.style.opacity="1"
  playmusicname.innerText=allSongs[musicindex-1].songName;
  if(play.classList.contains('fa-play')) {
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
}
  makeallforplay();
  eachplay[musicindex-1].classList.add('fa-circle-pause');
})
// Next Button-------
next.addEventListener('click',()=>{
  musicindex>=13?musicindex=1:musicindex+=1;
  music.src=`./song1/${musicindex}.mp3`;
  music.play();
  gif.style.width='30px'
  gif.style.opacity="1"
  playmusicname.innerText=allSongs[musicindex-1].songName;
  if(play.classList.contains('fa-play')) {
    play.classList.remove('fa-play')
    play.classList.add('fa-pause')
  }
  makeallforplay();
  eachplay[musicindex-1].classList.add('fa-circle-pause');
})
slider.addEventListener('progress',(e)=>{
  e.target.value=music.currentTime*(music.duration/100);
})
music.addEventListener('timeupdate',()=>{
  let progress=(music.currentTime/music.duration)*100;
  if(progress>=100){
     progress=0;
     makeallforplay();
     musicindex+=1;
     music.src=`./song1/${musicindex}.mp3`
     music.play();
     eachplay[musicindex-1].classList.remove('fa-circle-play');
     eachplay[musicindex-1].classList.add('fa-circle-pause');
    }else{   
      slider.value=progress;
      let min=parseInt(Math.round(music.currentTime)/60)
      let sec=Math.round(music.currentTime)%60
      starttime.innerText=`${min}:${sec}`
    }
  })
  //music progress seekbar(slider)
  slider.addEventListener('change',()=>{
    console.log(slider.value)
    music.currentTime=(slider.value* music.duration)/100;
  })
  music.onloadedmetadata=()=>{
    let a=(parseFloat(music.duration/60).toFixed(2)).split(".")
    let min=a[0];
  let second=Math.round((a[1]*60)/100)<10?"0"+Math.round((a[1]*60)/100):Math.round((a[1]*60)/100);
  endtime.innerText=`${min}:${second}`
}