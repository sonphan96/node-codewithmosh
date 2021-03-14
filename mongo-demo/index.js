const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongo'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

  const course = new Course({
    name: 'React Course',
    author: 'Mosh',
    tags: [ 'react', 'frontend' ],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};

async function getCourses() {
  const result = await Course
    .find( { author: 'Mosh', isPublished: true })
    // Comparition Query
    // .find({ price: { $gte: 10, $lte: 20 }})
    // .find({ price: { $in: [10, 15, 20] }})
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    
  console.log(result);
}

getCourses();
