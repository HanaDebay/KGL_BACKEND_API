const router = require("express").Router();
const Sales = require("../models/SalesModel.js");

const {success, error} = require("../utils/responseHandler.js");
const {validateCashSales, validateCreditSales} = require("../utils/validators.js");

const {protect} = require("../middlewares/authMiddleware.js");

const {authorizeRoles} = require("../middlewares/roleMiddleware.js");

/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales management
 */

/**
 * @swagger
 * /sales/cash:
 *   post:
 *     summary: Create a cash sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produceName:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               amountPaid:
 *                 type: number
 *               buyerName:
 *                 type: string
 *               salesAgent:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sale Created Successfully
 *       500:
 *         description: Error creating sale
 */
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

/**
 * @swagger
 * /sales/credit:
 *   post:
 *     summary: Create a credit sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               buyerName:
 *                 type: string
 *               nin:
 *                 type: string
 *               location:
 *                 type: string
 *               contact:
 *                 type: string
 *               amountDue:
 *                 type: number
 *               salesAgent:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date
 *               produceName:
 *                 type: string
 *               produceType:
 *                 type: string
 *               tonnage:
 *                 type: number
 *               dispatchDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Sale Created Successfully
 *       500:
 *         description: Error creating sale
 */
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