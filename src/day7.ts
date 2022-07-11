import fs from 'fs'

const dataSTR = fs.readFileSync('./data/day7.txt', { encoding: 'utf-8' })
const data: number[] = dataSTR
  .split(',')
  .map(m => parseInt(m))

const maxPosition = Math.max(...data)

const part1 = () => {
  const positionMovements = new Array(maxPosition)
    .fill(0)
    .map((m, n) => {
      const tmp = data
        .map(o => Math.abs(o - n))
        .reduce((a, b) => a + b)

      return tmp
    })

  const mostEfficientMovement = Math.min(...positionMovements)
  const mostEfficientPosition = positionMovements.indexOf(mostEfficientMovement)

  console.log(`The answer to part 1 is move to position ${mostEfficientPosition} for ${mostEfficientMovement} fuel.`)
}

const part2 = () => {
  const positionMovements = new Array(maxPosition)
    .fill(0)
    .map((m, n) => {
      const tmp = data
        .map(o => {
          const diff = Math.abs(o - n)
          return new Array(diff)
            .fill(0)
            .map((m, n) => n + 1)
            .reduce((a, b) => a + b, 0)
        })
        .reduce((a, b) => a + b)

      return tmp
    })

  const mostEfficientMovement = Math.min(...positionMovements)
  const mostEfficientPosition = positionMovements.indexOf(mostEfficientMovement)

  console.log(`The answer to part 2 is move to position ${mostEfficientPosition} for ${mostEfficientMovement} fuel.`)
}

part1()
part2()
