import fs from 'fs'

type Vector = {
  direction: string
  magnitude: number
}

const dataSTR = fs.readFileSync('./data/day2.txt', { encoding: 'utf-8' })
const data: Vector[] = dataSTR
  .split('\n')
  .map(m => m.split(' '))
  .map(m => {
    return {
      direction: m[0],
      magnitude: parseInt(m[1])
    }
  })

const part1 = () => {
  let depth = 0
  let position = 0

  for (const vector of data) {
    if (vector.direction === 'forward') {
      position += vector.magnitude
    } else if (vector.direction === 'up') {
      depth -= vector.magnitude
    } else if (vector.direction === 'down') {
      depth += vector.magnitude
    } else {
      position -= vector.magnitude
    }
  }

  console.log(`The answer to part 1 is ${depth * position}.`)
}

const part2 = () => {
  let aim = 0
  let depth = 0
  let position = 0

  for (const vector of data) {
    if (vector.direction === 'forward') {
      position += vector.magnitude
      depth += aim * vector.magnitude
    } else if (vector.direction === 'up') {
      aim -= vector.magnitude
    } else if (vector.direction === 'down') {
      aim += vector.magnitude
    } else {
      console.log('oops')
    }
  }

  console.log(`The answer to part 1 is ${depth * position}.`)
}

part1()
part2()
