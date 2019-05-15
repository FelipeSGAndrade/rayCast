class Ray {
  constructor(position, angle, color) {
    this.position = position
    this.direction = p5.Vector.fromAngle(angle)
    this.hit = null;
    this.color = color || { r : 255, g : 255, b : 255}
  }

  lookAt(x, y) {
    this.direction.x = x - this.position.x;
    this.direction.y = y - this.position.y;
    this.direction.normalize();
  }

  cast() {
    let closestPoint
    let closestDistance = Infinity

    for (let obstacle of obstacles) {
      const intersection = this.singleCast(obstacle);
      if (intersection && intersection.u < closestDistance) {
        closestDistance = intersection.u
        closestPoint = intersection.point
      }
    }

    if (closestPoint)
      this.hit = closestPoint
    else
      this.hit = null
  }

  singleCast(obstacle) {
    const x1 = obstacle.begin.x
    const y1 = obstacle.begin.y
    const x2 = obstacle.end.x
    const y2 = obstacle.end.y

    const x3 = this.position.x
    const y3 = this.position.y
    const x4 = this.position.x + this.direction.x
    const y4 = this.position.y + this.direction.y

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    if (den === 0)
      return

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

    if (t > 0 && t < 1 && u > 0) {
      const intersection = createVector()
      intersection.x = x1 + t * (x2 - x1)
      intersection.y = y1 + t * (y2 - y1)
      return {
        u,
        point : intersection
      }
    }
  }

  update() {
    this.cast()

    stroke(this.color.r, this.color.g, this.color.b, 50)
    push()
    if (this.hit)
      line(this.position.x, this.position.y, this.hit.x, this.hit.y);
    else {
      const endX = this.position.x + this.direction.x * 1000
      const endY = this.position.y + this.direction.y * 1000
      line(this.position.x, this.position.y, endX, endY);
    }
    pop();
  }
}
