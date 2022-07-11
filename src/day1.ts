import fs from 'fs'

const dataSTR = fs.readFileSync('./data/day1.txt', { encoding: 'utf-8' })
const data = dataSTR
  .split('\n')
  .map(m => parseInt(m))

const part1 = () => {
  let count = 0
  let lastNum = data[0]

  for (let i = 1; i < data.length; i++) {
    if (data[i] > lastNum) {
      count += 1
    }

    lastNum = data[i]
  }

  console.log(`The answer to part 1 is ${count}.`)
}

const part2 = () => {
  let count = 0
  let finalWindowIndex = data.length - 2
  let lastWindow = 0

  for (let i = 0; i < finalWindowIndex; i++) {
    let window1 = data[i]
    let window2 = data[i + 1]
    let window3 = data[i + 2]
    let sum = window1 + window2 + window3

    if (i === 0) {
      lastWindow = sum

      continue
    }

    if (sum > lastWindow) {
      count += 1
    }

    lastWindow = sum
  }

  console.log(`The answer to part 2 is ${count}.`)
}

part1()
part2()
