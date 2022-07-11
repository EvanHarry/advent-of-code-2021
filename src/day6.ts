import fs from 'fs'

// Days per respawn
// Days before capable of reproduction
const respawnRate = 7
const incubationPeriod = 2
const noOfDays = 256

const dataSTR = fs.readFileSync('./data/day6.txt', { encoding: 'utf-8' })
const data: number[] = dataSTR
  .split(',')
  .map(m => parseInt(m))
const fish: number[] = new Array(respawnRate + incubationPeriod).fill(0)

for (const val of data) {
  if (val > respawnRate + incubationPeriod) {
    console.log(`[error] fish with value greater than ${respawnRate + incubationPeriod}.`)
  }

  fish[val] += 1
}

const run = () => {
  for (let day = 0; day < noOfDays; day++) {
    let noOfNewFish = 0

    for (let i = 0; i < fish.length; i++) {
      if (i < 1) {
        noOfNewFish = fish[i]
      }
    }

    fish.splice(0, 1)
    fish.push(noOfNewFish)
    fish[respawnRate - 1] += noOfNewFish
  }

  const totalFish = fish.reduce((a, b) => a + b)

  console.log(`The answer is ${totalFish}.`)
}

run()
