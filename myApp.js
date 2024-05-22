require('dotenv').config();
const mongoose = require('mongoose');
let Person;

mongoose.connect('mongodb+srv://admin:admin@cluster0.ujqtzlw.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0',
  {useNewUrlParser:true,useUnifiedTopology:true}
);

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  age:{
    type:Number
  },
  favoriteFoods:{
    type: [String]
  }
});
Person = mongoose.model('Person',personSchema);



const createAndSavePerson = (done) => {
  const person = new Person({
    name:"Sadiq Hosainy",
    age:32,
    favoriteFoods: ["Abc","ABC"]
  })
  person.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,done);
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},done);
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId,done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
