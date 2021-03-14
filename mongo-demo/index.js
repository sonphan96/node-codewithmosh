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
  // Comparison Query
  // .find({ price: { $gte: 10, $lte: 20 }})
  // .find({ price: { $in: [10, 15, 20] }})

  // Logical operator
  // .find()
  // .or([{author: 'Mosh'}, {isPublished: true}])
  // .and([{}, {}])

  // .find({ author: /^Mosh/ })   // /pattern/
  // .find({ author: /Hame$/i})
  // .find({ author: /.*Mosh.*/})
  const pageNumber = 2;
  const pageSize = 10;

  const result = await Course
    .find( { author: 'Mosh', isPublished: true })
    .skip((pageNumber -1)*pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1});
    .count();
    
  console.log(result);
}

async function updateCourse(id) {
  // Query first
  // findByID
  // const course = await Course.findById(id);
  // modify
  // if(!course) return;

  // course.isPublished = true;
  // course.author = 'Another author';
  // course.set({
  //   isPublished: true,
  //   author: 'Another Author'
  // })

  // save
  // const result = await course.save();
  // console.log(result);

  // update first
  // update directly
  const result = await Course.find({ _id: id }, {
    $set: {
      author: 'Mosh',
      isPublished: false
    }
  });
  // Optional: get update document
  console.log(result);

}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

}

updateCourse('604d9511faff3b408999fcb0');
