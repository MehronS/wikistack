const express = require(`express`);
const router = express.Router();
const addPage = require(`../views/addPage`);
const layout = require("../views/layout");
const models = require(`../models/index`);

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

module.exports = router;

router
  .route(`/`)
  .get((req, res) => {
    res.send(layout(""));
  })
  .post(async (req, res, next) => {
    try {
      const page = await models.Page.create({
        title: req.body.title,
        content: req.body.content,
      });
      res.redirect(`/`);
    } catch (err) {
      next(err);
    }
  });

router.get(`/add`, (req, res) => {
  res.send(addPage());
});
