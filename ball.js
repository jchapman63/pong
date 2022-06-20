const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.000005;

// create ball object
export default class Ball {
  constructor(ballElem) {
    // instance of the object
    this.ballElem = ballElem;
    // resets ball positioning and movement
    this.reset();
  }

  // return the x value of ball's position as defined with a CSS variable
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"));
  }

  // allows us to change the value of the CSS x variable
  set x(value) {
    this.ballElem.style.setProperty("--x", value);
  }

  // return the Y value of ball's position as defined with a CSS variable
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"));
  }

  // allows us to change the value of the CSS Y variable
  set y(value) {
    this.ballElem.style.setProperty("--y", value);
  }

  rect() {
    // information about element size and position
    return this.ballElem.getBoundingClientRect();
  }

  // position and movement reset
  reset() {
    // baseline x and y
    this.x = 50;
    this.y = 50;
    // baseline direction
    this.direction = {
      x: 0,
    };
    while (
      // set these values to ensure it doesn't move too vertical i believe
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      // head of out vector
      const heading = randomNumberBetween(0, 2 * Math.PI);
      // unit vector for our direction
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    // define velocity of ball
    this.velocity = INITIAL_VELOCITY;
  }

  update(delta, paddleRect) {
    // update the x and y with delta (time passed) and velocity to create movement
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    // increase speed as time elapses
    this.velocity += VELOCITY_INCREASE * delta;
    // gets us position of ball
    const rect = this.rect();

    //ball bounces off the top and bottom, checks for position with rect
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    // bounces off left and right(will soon change to bounces off paddles)
    if (paddleRect.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

// how we get our random number for the vector
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  );
}
