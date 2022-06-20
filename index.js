import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

document.getElementById("start").addEventListener("click", (e) => {
  document.getElementById("ready").style.visibility = "hidden";
  document.getElementById("start").style.visibility = "hidden";
  document.getElementById("ball").style.visibility = "visible";
  // initially null
  let lastTime;
  function update(time) {
    if (lastTime != null) {
      const delta = time - lastTime;
      // Update code
      // calls on update method for the ball class
      ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
      computerPaddle.update(delta, ball.y);
      // change game color
      const hue = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--hue")
      );
      document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

      if (isLose()) {
        handleLose();
      }
      var win = checkWinner();
      if (win === "cWin" || win === "pWin") {
        // resets start button and ball and scores
        document.getElementById("start").style.visibility = "visible";
        document.getElementById("ball").style.visibility = "hidden";
        document.getElementById("ready").style.visibility = "visible";
        if (win === "cWin") {
          document.getElementById("ready").textContent = "Computer Wins!";
        } else {
          document.getElementById("ready").textContent = "Player Wins!";
        }
        playerScore.textContent = "0";
        computerScore.textContent = "0";
        return;
      }
    }
    // last time is now set to current time, we now have a value for it to plat off of
    lastTime = time;
    // infinite loop to update frames
    window.requestAnimationFrame(update);
  }

  // detects if a lose occurs
  function isLose() {
    const rect = ball.rect();
    // returns true for a loss
    return rect.right >= window.innerWidth || rect.left <= 0;
  }

  // handles what to do in the case of a loss
  function handleLose() {
    const rect = ball.rect();
    // increases score based on who lost
    if (rect.right >= window.innerWidth) {
      playerScore.textContent = parseInt(playerScore.textContent) + 1;
    } else {
      computerScore.textContent = parseInt(computerScore.textContent) + 1;
    }
    ball.reset();
    computerPaddle.reset();
  }

  function checkWinner() {
    if (parseInt(playerScore.textContent) === 10) {
      return "pWin";
    } else if (parseInt(computerScore.textContent) === 10) {
      return "cWin";
    } else {
      return "noWin";
    }
  }

  document.addEventListener("mousemove", (e) => {
    // convert event position of mouse to percent
    playerPaddle.position = (e.y / window.innerHeight) * 100;
  });

  document.addEventListener("touchmove", (e) => {
    // stop screen drag
    e.preventDefault();
    // location of touch
    var touchLocation = e.targetTouches[0];

    // assign paddle to new location
    playerPaddle.position = (touchLocation.pageY / window.innerHeight) * 100;
  });

  // starts the game loop
  window.requestAnimationFrame(update);
});
