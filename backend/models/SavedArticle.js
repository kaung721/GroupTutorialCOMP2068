const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SavedArticleSchema = new Schema({
    user: { type: Scheme.Types.ObjectId, ref: "User", required: true },
    title: String, 
    description: String, 
    url: { type: String, required: true },
    source: String, 
    category: String, 
    publishedAt: Date
}, { timestamps: true });

SavedArticleSchema.index({ user: 1, url: 1 }, { unique: true });

module.exports = mongoose.model("SavedArticle", SavedArticleSchema);