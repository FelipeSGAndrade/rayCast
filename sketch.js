const obstacles = []
const emitters = []

function setup() {
  createCanvas(640, 480)

  for (let i = 0; i < 5; i++) {
    const x1 = random(width)
    const x2 = random(width)
    const y1 = random(height)
    const y2 = random(height)
    obstacles.push(new Obstacle(createVector(x1, y1), createVector(x2, y2)))
  }

  for (let i = 0; i < 3; i++) {
    emitters.push(new Emitter())
  }
}

function draw() {
  background(0)

  for(let obstacle of obstacles) {
    obstacle.show()
  }

  for(let emitter of emitters) {
    emitter.update()
  }
}
