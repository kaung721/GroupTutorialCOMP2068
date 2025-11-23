const express = require("express");
const router = express.Router();
const { getFromRSS } = require("../services/newsService");
const categoryMap = {
  world: {
    url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    category: "world",
  },
  technology: {
    url: "https://www.theverge.com/rss/index.xml",
    category: "technology",
  },
  business: {
    url: "https://feeds.bbci.co.uk/news/business/rss.xml",
    category: "business",
  },
  general: {
    url: "https://abcnews.go.com/abcnews/topstories",
    category: "general",
  },
};
router.get("/", (req, res) =>
  res.json({ categories: Object.keys(categoryMap) })
);
router.get("/:category", async (req, res) => {
  const cat = req.params.category;
  const q = req.query.q?.toLowerCase() || "";
  const limit = parseInt(req.query.limit || "30", 10);
  const map = categoryMap[cat];
  if (!map) return res.status(404).json({ error: "Unknown category" });
  try {
    let articles = await getFromRSS(map.url, map.category);
    if (q) {
      articles = articles.filter(
        (a) =>
          a.title?.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      );
    }
    const seen = new Set();
    const uniq = [];
    for (const a of articles) {
      if (!a.url) continue;
      if (seen.has(a.url)) continue;
      seen.add(a.url);
      uniq.push(a);
      if (uniq.length >= limit) break;
    }
    res.json({ articles: uniq });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RSS" });
  }
});
module.exports = router;
