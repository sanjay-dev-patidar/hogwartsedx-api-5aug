const mongoose = require('mongoose');
const slugify = require('slugify');

const BulletPointSchema = new mongoose.Schema({
    text: String,
    image: String,
    video: String,
    codeSnippet: String
});

const SubtitleSchema = new mongoose.Schema({
    title: String,
    bulletPoints: [BulletPointSchema],
    image: String,
    video: String
});

const ComparisonItemSchema = new mongoose.Schema({
    title: String,
    bulletPoints: [String]
});

const ComparisonAttributeSchema = new mongoose.Schema({
    attribute: String,
    items: [ComparisonItemSchema]
});

const SuperTitleSchema = new mongoose.Schema({
    superTitle: String,
    attributes: [ComparisonAttributeSchema]
});

const SimilaritiesSchema = new mongoose.Schema({
    commonFeatures: String,
    explanation: String
});

const DifferencesSchema = new mongoose.Schema({
    distinctFeatures: String,
    explanation: String
});

const RatingSchema = new mongoose.Schema({
    item1Rating: Number,
    item2Rating: Number
});

const ConclusionSchema = new mongoose.Schema({
    recommendation: String,
    reasoning: String
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    titleImage: String,
    content: {
        type: String,
        required: true
    },
    titleVideo: String,
    author: {
        type: String,
        required: true
    },
    subtitles: [SubtitleSchema],
    summary: {
        type: String
    },
    superTitles: [SuperTitleSchema], 
    similarities: SimilaritiesSchema,
    differences: DifferencesSchema,
    rating: RatingSchema,
    conclusion: ConclusionSchema,
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});
PostSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, remove: /[*+~.()?,'"!:@]/g });
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);
