import fs from 'fs'

const dataSTR = fs.readFileSync('./data/day4.txt', { encoding: 'utf-8' })
const data = dataSTR
  .split('\n')
  .map(m => m
    .split(' ')
    .filter(m => m !== '')
  )

const drawnNumbers: number[] = data[0][0]
  .split(',')
  .map(m => parseInt(m))
const bingoCards: number[][][] = []

let tmp: number[][] = []
for (let i = 2; i < data.length; i++) {
  if (data[i].length > 0) {
    const row = data[i].map(m => parseInt(m))

    tmp.push(row)
  } else {
    bingoCards.push(tmp)
    tmp = []
  }
}

bingoCards.push(tmp)
tmp = []

const gridSize: number = bingoCards[0].length

const isBoardComplete = (scoreCard: number[][]): boolean => {
  let columnComplete = false
  let rowComplete = false

  for (let i = 0; i < gridSize; i++) {
    const columnScore = scoreCard
      .map(m => m[i])
      .reduce((a, b) => a + b)

    if (columnScore === gridSize) {
      columnComplete = true
    }

    const rowScore = scoreCard[i].reduce((a, b) => a + b)

    if (rowScore === gridSize) {
      rowComplete = true
    }
  }

  return columnComplete || rowComplete
}

const part1 = () => {
  const scoreCards: number[][][] = new Array(bingoCards.length)
    .fill([])
    .map(m => new Array(gridSize)
      .fill([])
      .map(n => new Array(gridSize).fill(0))
    )

  let winnerFound = false
  let winningCard = 0
  let winningNumber = 0

  for (const drawnNumber of drawnNumbers) {
    if (winnerFound) {
      break
    }

    for (let i = 0; i < bingoCards.length; i++) {
      const bingoCard = bingoCards[i]

      for (let j = 0; j < gridSize; j++) {
        const row = bingoCard[j]

        if (row.findIndex(m => m === drawnNumber) >= 0) {
          const k = row.findIndex(m => m === drawnNumber)

          scoreCards[i][j][k] = 1
        }
      }

      const scoreCard = scoreCards[i]
      const complete = isBoardComplete(scoreCard)

      if (complete) {
        winningCard = i
        winnerFound = true
        winningNumber = drawnNumber

        break
      }
    }
  }

  let finalScore = 0
  for (let i = 0; i < gridSize; i++) {
    const row = scoreCards[winningCard][i]

    for (let j = 0; j < gridSize; j++) {
      if (row[j] === 0) {
        finalScore += bingoCards[winningCard][i][j]
      }
    }
  }

  console.log(`The answer to part 1 is ${finalScore * winningNumber}.`)
}

const part2 = () => {
  const scoreCards: number[][][] = new Array(bingoCards.length)
    .fill([])
    .map(m => new Array(gridSize)
      .fill([])
      .map(n => new Array(gridSize).fill(0))
    )

  let winningCards: number[] = []
  let winningNumbers: number[] = []

  for (const drawnNumber of drawnNumbers) {
    for (let i = 0; i < bingoCards.length; i++) {
      if (winningCards.findIndex(m => m === i) >= 0) {
        continue
      }

      const bingoCard = bingoCards[i]

      for (let j = 0; j < gridSize; j++) {
        const row = bingoCard[j]

        if (row.findIndex(m => m === drawnNumber) >= 0) {
          const k = row.findIndex(m => m === drawnNumber)

          scoreCards[i][j][k] = 1
        }
      }

      const scoreCard = scoreCards[i]
      const complete = isBoardComplete(scoreCard)

      if (complete) {
        winningCards.push(i)
        winningNumbers.push(drawnNumber)
      }
    }
  }

  const lastWinningCard = winningCards[winningCards.length - 1]
  let finalScore = 0
  for (let i = 0; i < gridSize; i++) {
    const row = scoreCards[lastWinningCard][i]

    for (let j = 0; j < gridSize; j++) {
      if (row[j] === 0) {
        finalScore += bingoCards[lastWinningCard][i][j]
      }
    }
  }

  console.log(`The answer to part 2 is ${finalScore * winningNumbers[winningNumbers.length - 1]}.`)
}

part1()
part2()
