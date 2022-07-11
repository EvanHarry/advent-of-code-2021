import fs from 'fs'

const dataSTR = fs.readFileSync('./data/day5.txt', { encoding: 'utf-8' })
const data: Vent[] = dataSTR
  .split('\n')
  .map(m => {
    const row = m.split(' ')
    const start = row[0]
      .split(',')
      .map(n => parseInt(n))
    const end = row[2]
      .split(',')
      .map(n => parseInt(n))

    return {
      start: {
        x: start[0],
        y: start[1]
      },
      end: {
        x: end[0],
        y: end[1]
      }
    }
  })

type Position = {
  x: number
  y: number
}

type Vent = {
  start: Position
  end: Position
}

const part1 = () => {
  let colSize = 0
  let rowSize = 0

  for (const item of data) {
    const maxX = Math.max(item.end.x, item.start.x)
    const maxY = Math.max(item.end.y, item.start.y)

    if (maxX > colSize) {
      colSize = maxX
    }

    if (maxY > rowSize) {
      rowSize = maxY
    }
  }

  const diagram: number[][] = new Array(rowSize + 1)
    .fill([])
    .map(m => new Array(colSize + 1).fill(0))

  for (const vent of data) {
    if (vent.start.x === vent.end.x) {
      const x = vent.start.x

      for (let y = vent.start.y; y < vent.end.y + 1; y++) {
        diagram[y][x] += 1
      }

      for (let y = vent.end.y; y < vent.start.y + 1; y++) {
        diagram[y][x] += 1
      }
    }

    if (vent.start.y === vent.end.y) {
      const y = vent.start.y

      for (let x = vent.start.x; x < vent.end.x + 1; x++) {
        diagram[y][x] += 1
      }

      for (let x = vent.end.x; x < vent.start.x + 1; x++) {
        diagram[y][x] += 1
      }
    }
  }

  let noOfOverlaps = 0

  for (const row of diagram) {
    for (const col of row) {
      if (col > 1) {
        noOfOverlaps += 1
      }
    }
  }

  console.log(`The answer to part 1 is ${noOfOverlaps}.`)
}

const part2 = () => {
  let colSize = 0
  let rowSize = 0

  for (const item of data) {
    const maxX = Math.max(item.end.x, item.start.x)
    const maxY = Math.max(item.end.y, item.start.y)

    if (maxX > colSize) {
      colSize = maxX
    }

    if (maxY > rowSize) {
      rowSize = maxY
    }
  }

  const diagram: number[][] = new Array(rowSize + 1)
    .fill([])
    .map(m => new Array(colSize + 1).fill(0))

  for (const vent of data) {
    if (vent.start.x === vent.end.x) {
      const x = vent.start.x

      for (let y = vent.start.y; y < vent.end.y + 1; y++) {
        diagram[y][x] += 1
      }

      for (let y = vent.end.y; y < vent.start.y + 1; y++) {
        diagram[y][x] += 1
      }
    } else if (vent.start.y === vent.end.y) {
      const y = vent.start.y

      for (let x = vent.start.x; x < vent.end.x + 1; x++) {
        diagram[y][x] += 1
      }

      for (let x = vent.end.x; x < vent.start.x + 1; x++) {
        diagram[y][x] += 1
      }
    } else {
      const xDiff = vent.start.x - vent.end.x
      const yDiff = vent.start.y - vent.end.y

      if (Math.abs(xDiff) % 2 === Math.abs(yDiff) % 2) {
        if (xDiff > 0) {
          // down-left
          if (yDiff < 0) {
            let y = vent.start.y
            for (let x = vent.start.x; x >= vent.end.x; x--) {
              diagram[y][x] += 1
              y += 1
            }
          }

          // up-left
          if (yDiff > 0) {
            let y = vent.start.y
            for (let x = vent.start.x; x >= vent.end.x; x--) {
              diagram[y][x] += 1
              y -= 1
            }
          }
        }

        if (xDiff < 0) {
          // down-right
          if (yDiff < 0) {
            let y = vent.start.y
            for (let x = vent.start.x; x <= vent.end.x; x++) {
              diagram[y][x] += 1
              y += 1
            }
          }

          // up-right
          if (yDiff > 0) {
            let y = vent.start.y
            for (let x = vent.start.x; x <= vent.end.x; x++) {
              diagram[y][x] += 1
              y -= 1
            }
          }
        }
      }
    }
  }

  let noOfOverlaps = 0

  for (const row of diagram) {
    for (const col of row) {
      if (col > 1) {
        noOfOverlaps += 1
      }
    }
  }

  console.log(`The answer to part 2 is ${noOfOverlaps}.`)
}

part1()
part2()
