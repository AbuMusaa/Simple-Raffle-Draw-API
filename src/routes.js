const {
  sellSingleTicket,
  sellBulkTicket,
  findAll,
  findById,
  findByUsername,
  updateById,
  updateByUsername,
  deleteById,
  deleteByUsername,
  drawWinners,
} = require("./controllers");

const router = require("express").Router();

router.route("/t/:id").get(findById).patch(updateById).delete(deleteById);

router
  .route("/u/:username")
  .get(findByUsername)
  .patch(updateByUsername)
  .delete(deleteByUsername);

router.get("/draw", drawWinners);
router.post("/bulk", sellBulkTicket);

router.route("/").get(findAll).post(sellSingleTicket);

module.exports = router;
