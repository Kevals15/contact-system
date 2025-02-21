const express = require("express");
const router = express.Router();
const {
    getcontacts, createcontacts, getcontact, updatecontact, deletecontact
} = require("../controllers/contactControllers");
const validateTokenHandler = require("../middleware/validate");
router.use(validateTokenHandler);
router.route('/').get(getcontacts).post(createcontacts);
router.route('/:id').get(getcontact).put(updatecontact).delete(deletecontact);


module.exports = router;