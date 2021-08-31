const router = require("express").Router();

const { strartStream, watchStream } = require("../controllers/webrtc");

router.post("/broadcast", strartStream);
router.post("/consumer", watchStream);

module.exports = router;
