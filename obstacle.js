class Obstacle {
  constructor(begin, end) {
    this.begin = begin
    this.end = end
  }

  show() {
    stroke(255)
    line(this.begin.x, this.begin.y, this.end.x, this.end.y)
  }
}
