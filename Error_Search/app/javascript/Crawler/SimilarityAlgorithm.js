import natural from 'natural'
import fs from 'fs'

const dir = './tempfiles'
const term = "classes"

const Tfidf = natural.TfIdf
const tfidf = new Tfidf

// Form TF-IDF values for individual files

const length = fs.readdirSync(dir).length

var startTime = performance.now()

let tfidfArrayValues = []

for (let i =1; i <=length; i++){
    let fileName = `./tempfiles/tempfile${i}.txt`
    tfidf.addFileSync(fileName)
    tfidfArrayValues[i-1] = [fileName, 0]
}

tfidf.tfidfs(term, function(i, measure){
    tfidfArrayValues[i][1] = measure
})

// Calculate similarity score for pages

let similarityArrayValues = []
let finalSimilarityValues = []

for (let i =0; i <length; i++){
    similarityArrayValues[i] = [0]
    for (let j =0; j <length-1; j++){
        let x = tfidfArrayValues[i][1]
        let y = tfidfArrayValues[j+1][1]
        similarityArrayValues[i][j] = (x * y) / ((x**2) + (y**2) - (x*y))
    }
    const sum = similarityArrayValues[i].reduce((a,b) => a+b, 0)
    finalSimilarityValues[i] = [tfidfArrayValues[i][0] , sum ? sum : 0]
}

finalSimilarityValues.sort((a, b)=> a[1]-b[1])

var endTime = performance.now()

// console.log(`Sorting time took: ${endTime - startTime} milliseconds.`)
console.log((finalSimilarityValues.reduce((partialSum, a) => console.log(a)), 0))

// console.log(finalSimilarityValues)
