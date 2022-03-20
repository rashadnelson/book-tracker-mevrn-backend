const bookModel = require('../models/bookModel')

module.exports = {

    getBook: (request, response) => {
        const goal = bookModel.find({}, (error, result) => {
            if (error) {
                response.json(error)
            }
            else {
                response.json(result)
            }
        })
    },

    createBook: async (request, response) => {
        const book = request.body
        const newBook = new bookModel(book);
        await newBook.save();
        console.log("A book has been added")
        console.log(book)

        response.json(book)
    },

    updateBook: async (request, response) => {
        const book = await bookModel.findById(request.params.id)

        if (!book) {
            response.status(400)
            throw new Error("Book not found")
        }

        const updatedBook = await bookModel.findByIdAndUpdate({ _id: request.params.id }, request.body, {
            new: true,
        })

        response.status(200).json(updatedBook)
    },

    deleteBook: async (request, response) => {

        const book = await bookModel.findById(request.params.id)

        if (!book) {
            response.status(400)
            throw new Error("Book not found")
        }

        await book.remove()

        response.status(200).json({ id: request.params.id })
    }

}