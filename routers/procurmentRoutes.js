const router = require("express").Router();
const Procurement = require("../models/ProcurementModel.js");

const {success, error} = require("../utils/responseHandler.js");
const {validateProcurement} = require("../utils/validators.js");

const {protect} = require("../middlewares/authMiddleware.js");

const {authorizeRoles} = require("../middlewares/roleMiddleware.js");


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
