const express = require("express")
const { addReview, getUserReviews, deleteReview, editReview } = require("../controllers/reviewController")
const {loginRequired} = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", loginRequired, getUserReviews)
router.post("/", loginRequired, addReview)
router.delete("/:id", loginRequired, deleteReview)
router.patch("/", loginRequired, editReview)
module.exports = router