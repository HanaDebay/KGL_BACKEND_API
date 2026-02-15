const router = require("express").Router();
const Procurement = require("../models/ProcurementModel.js");

const {success, error} = require("../utils/responseHandler.js");
const {validateProcurement} = require("../utils/validators.js");

const {protect} = require("../middlewares/authMiddleware.js");

const {authorizeRoles} = require("../middlewares/roleMiddleware.js");


/**
 * @swagger
 * tags:
 *   name: Procurements
 *   description: Procurement management
 */

/**
 * @swagger
 * /procurements:
 *   post:
 *     summary: Create a new procurement record
 *     tags: [Procurements]
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
 *               produceType:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               tonnage:
 *                 type: number
 *               cost:
 *                 type: number
 *               dealerName:
 *                 type: string
 *               branch:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Procurement Created Successfully
 *       500:
 *         description: Error creating procurement
 */
//create procurement manager only
router.post( "/", protect, authorizeRoles("Manager"),validateProcurement, async(req, res)=>{
try {
const data = await Procurement.create({
    ...req.body,
    recordedBy: req.user._id

});
return success(res, data, "Procurement Created Successfully");

} catch (err) {
    console.error("Error creating procurement:", err);
    error(res, "Error creating procurement", 500);
    
}
})

/**
 * @swagger
 * /procurements:
 *   get:
 *     summary: Get all procurements
 *     tags: [Procurements]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Procurement fetched successfully
 *       500:
 *         description: Error fetching procurement
 */
//get all procurement
router.get("/", protect, async(req, res)=>{
try {
    const procurements = await Procurement.find().populate("recordedBy", "name role");
    return success(res, procurements, "Procurement fetched successfully");
} catch (err) {
    console.error("Error fetching procurement:", err);
    return error(res, "Error fetching procurement", 500);
}

})
        



module.exports = router;
