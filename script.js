// --------------------
// Floating hearts (optional)
// --------------------
let heartsTimer = null;

function startHearts(rateMs = 650){
  stopHearts();
  heartsTimer = setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (5 + Math.random() * 6) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }, rateMs);

  // small initial burst
  for(let i=0;i<8;i++){
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = (5 + Math.random() * 6) + 's';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 12000);
    }, i * 120);
  }
}

function stopHearts(){
  if (heartsTimer) clearInterval(heartsTimer);
  heartsTimer = null;
}

// --------------------
// Playful NO button dodge
// --------------------
function dodge(btn){
  if(!btn) return;
  btn.style.position = 'relative';

  const move = () => {
    const x = (Math.random() * 200) - 100;
    const y = (Math.random() * 120) - 60;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  };

  btn.addEventListener('mouseover', move);
  btn.addEventListener('touchstart', move, { passive: true });
}

// --------------------
// Music toggle (iPhone-safe: user taps)
// --------------------
function musicToggle(audioId = 'music', buttonId = 'musicBtn'){
  const audio = document.getElementById(audioId);
  const btn = document.getElementById(buttonId);
  if(!audio || !btn) return;

  // restore last state
  const saved = localStorage.getItem("val_music") || "off";
  if(saved === "on"){
    btn.innerText = '🔊 Music On (tap)';
  } else {
    btn.innerText = '🔈 Music Off (tap)';
  }

  btn.onclick = async () => {
    try{
      if(audio.paused){
        await audio.play();
        localStorage.setItem("val_music","on");
        btn.innerText = '🔊 Music On';
      } else {
        audio.pause();
        localStorage.setItem("val_music","off");
        btn.innerText = '🔈 Music Off';
      }
    } catch {
      // Safari sometimes needs a second tap
      btn.innerText = '🔊 Tap again';
    }
  };
}

// --------------------
// Continuous custom image rain (YES page)
// --------------------
let rainTimer = null;

function startImageRain(imageSrc, {
  spawnRateMs = 180,    // lower = more intense
  minSize = 22,
  maxSize = 44,
  minSpeed = 1.6,
  maxSpeed = 3.8,
  drift = 1.2
} = {}){
  stopImageRain();

  const spawnOne = () => {
    const img = document.createElement('img');
    img.src = imageSrc;

    const size = minSize + Math.random() * (maxSize - minSize);
    img.style.position = 'fixed';
    img.style.width = size + 'px';
    img.style.height = 'auto';
    img.style.pointerEvents = 'none';
    img.style.left = (Math.random() * 100) + 'vw';
    img.style.top = (-60 - Math.random() * 120) + 'px';
    img.style.zIndex = '999';

    // slight rotation / glow feels premium
    img.style.transform = `rotate(${(Math.random()*30)-15}deg)`;
    img.style.filter = 'drop-shadow(0 10px 18px rgba(0,0,0,.35))';

    document.body.appendChild(img);

    const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
    const side = ((Math.random()*2)-1) * drift;

    let y = parseFloat(img.style.top);
    let x = parseFloat(img.style.left);

    const tick = setInterval(() => {
      y += speed * 4;      // multiplier for smooth speed
      x += side;

      img.style.top = y + 'px';
      img.style.left = x + 'vw';

      if (y > window.innerHeight + 80) {
        clearInterval(tick);
        img.remove();
      }
    }, 16);
  };

  // initial burst
  for(let i=0;i<18;i++) setTimeout(spawnOne, i*60);

  // continuous spawn
  rainTimer = setInterval(spawnOne, spawnRateMs);
}

function stopImageRain(){
  if(rainTimer) clearInterval(rainTimer);
  rainTimer = null;
}
