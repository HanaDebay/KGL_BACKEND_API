const router = require("express").Router();
const Sales = require("../models/SalesModel.js");

const {success, error} = require("../utils/responseHandler.js");
const {validateCashSales, validateCreditSales} = require("../utils/validators.js");

const {protect} = require("../middlewares/authMiddleware.js");

const {authorizeRoles} = require("../middlewares/roleMiddleware.js");

//create cash sale
router.post("/cash", protect, authorizeRoles("SalesAgent"), validateCashSales, async (req, res) => {
    try {
        const sale = await Sales.create({
            ...req.body,
            type: "cash",
            recordedBy: req.user._id
        });
        return success(res, sale, "Sale Created Successfully");
    } catch (err) {
        console.error("Error creating cash sale:", err);
        return error(res, "Error creating sale", 500);
    }
});

//create credit sale
router.post("/credit", protect, authorizeRoles("SalesAgent"), validateCreditSales, async (req, res) => {
    try {
        const sale = await Sales.create({
            ...req.body,
            type: "credit",
            recordedBy: req.user._id
        });
        return success(res, sale, "Sale Created Successfully");
    } catch (err) {
        console.error("Error creating credit sale:", err);
        return error(res, "Error creating sale", 500);
    }
});




module.exports = router;