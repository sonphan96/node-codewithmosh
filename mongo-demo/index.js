const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to mongo'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 225
  },
  category: {
    type: String,
    require: true,
    enum: [ 'web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function(value, callback) {
        return value && value.length > 0;
      },
      message: 'A Course should has at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
})

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

  const course = new Course({
    name: 'React Course',
    author: 'Mosh',
    category: 'WEB',
    tags: ['front end'],
    isPublished: true,
    price: 15
  });

  try{
    const result = await course.save();
    console.log(result);
  }
  catch(err) {
    console.log('---------SOMETHING WENT WRONG----------', err.message);
  }
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
    // .skip((pageNumber -1)*pageSize)
    // .limit(pageSize)
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

createCourse();
