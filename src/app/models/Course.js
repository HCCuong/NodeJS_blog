const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');

//const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, maxLength: 600 },
  videoId: { type: String, required: true },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', Course);