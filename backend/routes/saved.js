const express = require("express");
const SavedArticle = require("../models/SavedArticle");
const ensureAuth = require("../utils/ensureAuth");
const router = express.Router();
router.use(ensureAuth);
router.get("/", async (req, res) => {
  try {
    const saved = await SavedArticle.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ saved });
  } catch (err) {
    res.status(500).json({ error: "db" });
  }
});
router.post("/", async (req, res) => {
  const { title, description, url, source, category, publishedAt } = req.body;
  if (!url) return res.status(400).json({ error: "Missing url" });
  try {
    const doc = await SavedArticle.findOneAndUpdate(
      { user: req.user._id, url },
      {
        user: req.user._id,
        title,
        description,
        url,
        source,
        category,
        publishedAt,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json({ ok: true, saved: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "db" });
  }
});
router.delete("/", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing url" });
  try {
    const r = await SavedArticle.deleteOne({ user: req.user._id, url });
    res.json({ ok: true, deleted: r.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "db" });
  }
});
module.exports = router;
