import Ball from "./ball.js"
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score");
const computerScoreElem = document.getElementById("computer-score");

let lastTime;
let isPause=true;
let stopAnimation;

function step(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
     ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
     computerPaddle.update(delta, ball.y);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
 stopAnimation= window.requestAnimationFrame(step)
}

// this func return true if ball pass out any paddle without touching it
function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0
}
// now handle the case if paddles fail to strike ball
function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
  }
  ball.reset()
  computerPaddle.reset()
}
// player paddle set to move wherever your mouse move
document.addEventListener("mousemove", e => {
  playerPaddle.position = (e.y / window.innerHeight) * 100
})
const info=document.getElementById('info-about-game');
// this playGame Function is for Play or Pause the game
function playGame(){
  if(isPause){
     isPause=false;
    //  console.log("start the game");
     info.style.display="none";
   
  window.requestAnimationFrame(step);

  }else{
      isPause=true;
      // console.log("stop the game")
      cancelAnimationFrame(stopAnimation);


  }
}
document.addEventListener('click', playGame);