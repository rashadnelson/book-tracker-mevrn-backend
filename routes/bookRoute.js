const express = require("express")
const { route } = require("express/lib/application")
const router = express.Router()
const bookController = require("../controllers/bookController")

router.get("/", bookController.getBook)
router.post("/createBook", bookController.createBook)
router.put("/updateBook/:id", bookController.updateBook)
router.delete("/deleteBook/:id", bookController.deleteBook)

module.exports = router;