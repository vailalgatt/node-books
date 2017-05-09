var express = require('express')
var bodyParser = require('body-parser')
var server = express()
var port = 3000

server.use(bodyParser.json())

server.get('/', function (req, res, next) {
    res.send(200, "TEST TEST TEST TEST")
})

var books = [{
    title: 'The Poisonwood Bible',
    publisher: 'Haper Colins Publisher',
    rating: 4.4,
    author: "Barbara Kingsolver"
}]

server.get('/books', function (req, res, next) {
    res.send(books)
})

server.get('/books/:id', function (req, res, next) {
    var id = req.params.id
    console.log(id)
    if (books[id]) {
        res.send(books[id])
    } else {
        res.send(404, {
            error: {
                message: "Sorry no book at id" + id
            }
        })
    }
})



server.post('/books', function (req, res, next) {

    var newBook = req.body

    if (newBook.title && newBook.publisher && newBook.rating && newBook.author) {
        books.push(newBook)
        res.send('Okay')
    } else {
        res.send(401, 'sorry you must have a book name to add a book')
    }
})






server.put('/books/:id', function (req, res, next) {

    var editBook = req.body
    var id = req.params.id

    if (editBook.title && editBook.publisher && editBook.rating && editBook.author) {
        books[id] = editBook
        res.send('Okay')
    } else {
        res.send(401, 'sorry you must have a book name to add a book')
    }
})




server.delete('/books/:id', function (req, res, next) {

    var id = req.params.id

    books.splice(id, 1)
    res.send(200, 'You removed a book')

})





server.listen(port, function () {
    console.log("The server is working and listening for the request on port: ", port)
})