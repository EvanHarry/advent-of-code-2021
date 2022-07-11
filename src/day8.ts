import fs from 'fs'

type Signal = {
  output: string[]
  patterns: string[]
}

const dataSTR = fs.readFileSync('./data/day8.txt', { encoding: 'utf-8' })
const data: Signal[] = dataSTR
  .split('\n')
  .map(m => {
    const cols = m.split(' | ')
    const output = cols[1].split(' ')
    const patterns = cols[0].split(' ')

    return { output, patterns }
  })

type Digit = {
  number: number
  segments: string[]
}

const codes: Digit[] = [
  { number: 0, segments: ['a', 'b', 'c', 'e', 'f', 'g'] },
  { number: 1, segments: ['c', 'f'] },
  { number: 2, segments: ['a', 'c', 'd', 'e', 'g'] },
  { number: 3, segments: ['a', 'c', 'd', 'f', 'g'] },
  { number: 4, segments: ['b', 'c', 'd', 'f'] },
  { number: 5, segments: ['a', 'b', 'd', 'f', 'g'] },
  { number: 6, segments: ['a', 'b', 'd', 'e', 'f', 'g'] },
  { number: 7, segments: ['a', 'c', 'f'] },
  { number: 8, segments: ['a', 'b', 'c', 'd', 'e', 'f', 'g'] },
  { number: 9, segments: ['a', 'b', 'c', 'd', 'f', 'g'] }
]

const part1 = () => {
  const output: number[] = []

  for (const dat of data) {
    for (const val of dat.output) {
      const uniqueChars = val
        .split('')
        .filter((m, n, a) => a.indexOf(m) === n)

      const possibleCodes = codes.filter(m => m.segments.length === uniqueChars.length)

      if (possibleCodes.length === 1) {
        output.push(possibleCodes[0].number)
      }

    }
  }

  console.log(`The answer to part 1 is ${output.length}.`)
}

part1()
