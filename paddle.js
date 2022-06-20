const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }
  // returns position of paddle
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }
  set position(value) {
    // allows position to be changed with CSS property variable
    this.paddleElem.style.setProperty("--position", value);
  }

  reset() {
    this.position = 50;
  }

  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  update(delta, ballHeight) {
    // comp paddle follows ball at rate of speed
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
