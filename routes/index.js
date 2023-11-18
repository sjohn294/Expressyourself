const router = require("express").Router();
const viewRoutes = require("./view");
router.use("/", viewRoutes);

const apiRoutes = require("./api");
router.use("/api", apiRoutes);




module.exports = router