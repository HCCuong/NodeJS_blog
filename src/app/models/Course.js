const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');

//const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String, maxLength: 600 },
  videoId: { type: String, required: true },
  level: { type: String, maxLength: 255 },
  slug: { type: String, slug: 'name', unique: true }
}, {
  timestamps: true,
});
// Custom query helpers
CourseSchema.query.sortable = function(req) {
  if(req.query.hasOwnProperty('_sort')) {
    const isValidtype = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
        [req.query.column]: isValidtype ? req.query.type : 'desc',
    });
  }
  return this;
};

module.exports = mongoose.model('Course', CourseSchema);