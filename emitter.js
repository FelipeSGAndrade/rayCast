class Emitter {
  constructor() {
    this.xoffset = random(10000)
    this.yoffset = random(10000)
    
    this.color = {
      r : random(255),
      g : random(255),
      b : random(255)
    }

    this.position = createVector(width / 2, height / 2)
    this.rays = []
    for (let angle = 0; angle < 360; angle += 360/nRays) {
      this.rays.push(new Ray(this.position, radians(angle), this.color))
    }
  }

  updatePosition() {
    const x = noise(this.xoffset) * width
    const y = noise(this.yoffset) * height
    this.xoffset += 0.01
    this.yoffset += 0.01

    this.position.set(x, y)
  }

  update() {
    fill(this.color.r, this.color.g, this.color.b)
    stroke(this.color.r, this.color.g, this.color.b)
    ellipse(this.position.x, this.position.y, 16)

    this.updatePosition()

    for(let ray of this.rays) {
      ray.update()
    }
  }
}
