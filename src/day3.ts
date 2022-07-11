import fs from 'fs'

const dataSTR = fs.readFileSync('./data/day3.txt', { encoding: 'utf-8' })
const data = dataSTR.split('\n')

const part1 = () => {
  const dataLength = data.length
  const noOfBits = data[0].length
  const bitCount = new Array(noOfBits).fill(0)

  let gammaRateBinary = ''
  let epsilonRateBinary = ''

  const g = data.map(m => {
    for (let i = 0; i < noOfBits; i++) {
      const bit = m[i]

      bitCount[i] += parseInt(bit)
    }
  })

  for (let i = 0; i < noOfBits; i++) {
    let bit1Count = 0

    for (let j = 0; j < data.length; j++) {
      const bit = data[j][i]

      bit1Count += parseInt(bit)
    }

    if (bit1Count > dataLength / 2) {
      gammaRateBinary += '1'
      epsilonRateBinary += '0'
    } else {
      gammaRateBinary += '0'
      epsilonRateBinary += '1'
    }
  }

  const gammaRate = parseInt(gammaRateBinary, 2)
  const epsilonRate = parseInt(epsilonRateBinary, 2)

  console.log(`The answer to part 1 is ${gammaRate * epsilonRate}.`)
}

const part2 = () => {
  const noOfBits = data[0].length

  // oxygen generator rating
  let oxygenGeneratorRatingData: string[] = JSON.parse(JSON.stringify(data))

  for (let i = 0; i < noOfBits; i++) {
    if (oxygenGeneratorRatingData.length === 1) {
      break
    }

    let bit1Count = 0

    for (let j = 0; j < oxygenGeneratorRatingData.length; j++) {
      const bit = oxygenGeneratorRatingData[j][i]

      bit1Count += parseInt(bit)
    }

    if (bit1Count >= oxygenGeneratorRatingData.length / 2) {
      oxygenGeneratorRatingData = oxygenGeneratorRatingData.filter(m => m[i] === '1')
    } else {
      oxygenGeneratorRatingData = oxygenGeneratorRatingData.filter(m => m[i] === '0')
    }
  }

  const oxygenGeneratorRating = parseInt(oxygenGeneratorRatingData[0], 2)

  // co2 scrubber rating
  let co2ScrubberRatingData: string[] = JSON.parse(JSON.stringify(data))

  for (let i = 0; i < noOfBits; i++) {
    if (co2ScrubberRatingData.length === 1) {
      break
    }

    let bit0Count = 0

    for (let j = 0; j < co2ScrubberRatingData.length; j++) {
      const bit = co2ScrubberRatingData[j][i]

      bit0Count += bit === '0' ? 1 : 0
    }

    if (bit0Count <= co2ScrubberRatingData.length / 2) {
      co2ScrubberRatingData = co2ScrubberRatingData.filter(m => m[i] === '0')
    } else {
      co2ScrubberRatingData = co2ScrubberRatingData.filter(m => m[i] === '1')
    }
  }

  const co2ScrubberRating = parseInt(co2ScrubberRatingData[0], 2)

  console.log(`The answer to part 2 is ${oxygenGeneratorRating * co2ScrubberRating}.`)
}

part1()
part2()
