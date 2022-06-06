const express = require("express");
const Template = require("../model/template");
const router = express.Router();

//  REST template APis

router.get("/xhr/v1/template", async (req, res) => {
  const temps = await Template.find({}).sort({
    update_at: -1,
  });

  res.$success(temps);
});

router.post("/xhr/v1/template", async (req, res) => {
  // req.body
  try {
    const temp = await Template.create(req.body);
    res.$success(temp);
  } catch (e) {
    res.$error(e);
  }
});

router.get("/xhr/v1/template/:id", async (req, res) => {
  try {
    const temp = await Template.findById(req.params.id);
    res.$success(temp);
  } catch (e) {
    res.$success({}, 400);
  }
});

router.put("/xhr/v1/template/:id", async (req, res) => {
  try {
    const temp = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.$success(temp);
  } catch (e) {
    console.log(e);
    res.$error("update error", 400);
  }
});

router.delete("/xhr/v1/template/:id", async (req, res) => {
  try {
    const temp = await Template.findByIdAndRemove(
      req.params.id
    );
    res.$success("deleted");
  } catch (e) {
    res.$error("fail");
  }
});

module.exports = router;
