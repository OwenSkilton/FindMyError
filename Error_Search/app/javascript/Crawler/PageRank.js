import natural from 'natural'
import fs from 'fs'

const dir = './tempfiles'

const Tfidf = natural.TfIdf
const tfidf = new Tfidf

const length = fs.readdirSync(dir).length

for (let i =1; i <=length; i++){
    tfidf.addFileSync(`./tempfiles/tempfile${i}.txt`)
}

tfidf.tfidfs('Steve', function(i, measure){
    console.log('document #' + (i+1) + ' is ' + measure)
})