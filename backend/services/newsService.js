const RSSParser = require('rss-parser');
const parser = new RSSParser();

async function getFromRSS(url, category = 'general') {
  const feed = await parser.parseURL(url);
  return (feed.items || []).map(i => {

    let description = i.contentSnippet || i.summary || '';
    if(description.length > 100) {
      description = description.slice(0, 100) + '...';
    }

    return {
    title: i.title,
    description,
    url: i.link,
    source: feed.title,
    publishedAt: i.isoDate || i.pubDate,
    category
  };
});
}

module.exports = { getFromRSS };
