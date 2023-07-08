import Ball from "./ball.js";
import Paddle from "./paddle.js";

    // Get references to the screens and buttons
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const restartButton = document.getElementById('restartButton');
    const scoreElement = document.getElementById('score');
    // Get references to the Scores
    const playerScoreElem = document.getElementById("player-score");
    const computerScoreElem = document.getElementById("computer-score");
    // get reference to the game container
    const gameScreen=document.getElementById('game-container');

//   get Classes
const ball=new Ball(document.getElementById('ball'));
const playerPaddle=new Paddle(document.getElementById('player-paddle'));
const computerPaddle= new Paddle(document.getElementById('computer-paddle'));


let lastTime;
let stopAnimation;
let gameRunning=true;;
let highScore=3;

// function for game loop 


      function step(time){
        
        if (lastTime != null) {
            const delta = time - lastTime;
             ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
             computerPaddle.update(delta, ball.y);
            const hue = parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue("--hue")
            );
        
            document.documentElement.style.setProperty("--hue", hue + delta * 0.01)
    
            if (isLose()) handleLose()
           
            if(gameRunning && playerScoreElem.textContent===highScore){
              gameRunning=false
               showGameOverScreen(playerScoreElem.textContent);
              
             }else
             if(gameRunning && computerScoreElem.textContent>highScore){
              gameRunning=false;
                   showGameOverScreen(playerScoreElem.textContent);
                  
             }
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



    // Function to show the start screen
    function showStartScreen() {
      startScreen.style.display = 'block';
      gameOverScreen.style.display = 'none';
      gameScreen.style.display='none'
      
      startButton.addEventListener('click', function() {
        startGame();
      });
      
    }

    // Function to show the game over screen
    function showGameOverScreen(score) {
      scoreElement.textContent = score;
      startScreen.style.display = 'none';
      gameScreen.style.display='none';
      gameOverScreen.style.display = 'block';

    }

    // Function to start the game
    function startGame() {
      gameOverScreen.style.display='none';
      startScreen.style.display='none';
      gameScreen.style.display='block';

     requestAnimationFrame(step);
      
    }

    // Event listeners for buttons
  
    restartButton.addEventListener('click', function() {
      cancelAnimationFrame(stopAnimation)
        window.location.reload();
      showStartScreen();
    });

    // Show the start screen initially
    showStartScreen();
         
    // listener to the mouse movement for player paddle
    document.addEventListener("mousemove", e => {
      playerPaddle.position = (e.y / window.innerHeight) * 100;
    })
  