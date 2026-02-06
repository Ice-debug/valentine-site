// floating hearts
setInterval(()=>{

const heart=document.createElement('div');
heart.className='heart';
heart.style.left=Math.random()*100+'vw';
heart.style.animationDuration=(4+Math.random()*4)+'s';

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),8000);

},500);


// playful NO button
function dodge(btn){

btn.style.position='relative';

btn.addEventListener('mouseover',move);
btn.addEventListener('touchstart',move);

function move(){

const x=(Math.random()*200)-100;
const y=(Math.random()*120)-60;

btn.style.transform=`translate(${x}px,${y}px)`;
}

}

// confetti
function confetti(){

for(let i=0;i<120;i++){

const c=document.createElement('div');

c.style.position='fixed';
c.style.width='8px';
c.style.height='8px';
c.style.background=`hsl(${Math.random()*360},100%,60%)`;
c.style.left=Math.random()*100+'vw';
c.style.top='-10px';
c.style.opacity='.8';
c.style.borderRadius='2px';

document.body.appendChild(c);

let fall=setInterval(()=>{

c.style.top=parseFloat(c.style.top)+5+'px';

if(parseFloat(c.style.top)>window.innerHeight){
c.remove();
clearInterval(fall);
}

},20);

}

}

// music toggle
function musicToggle(){

const audio=document.getElementById('music');

document.getElementById('musicBtn')
.onclick=()=>{

if(audio.paused){
audio.play();
document.getElementById('musicBtn').innerText='🔊 Music On';
}else{
audio.pause();
document.getElementById('musicBtn').innerText='🔈 Music Off';
}

}

}
