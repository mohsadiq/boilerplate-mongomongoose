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

  Person.findById(personId, (err, personFound) => {
    if(err) {
      console.log(err)
    } else {
    personFound.favoriteFoods.push(foodToAdd);
    }
    
    personFound.save((err, updatedPerson) => {
      if(!err) {
        done(null, updatedPerson);
        console.log(`Found and Updated! \n ${updatedPerson}`);
      } else {
        console.log(err);
      };
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(!err){
      done(null,data);
      console.log('Sucess, new age: ${data)')
    }else
    {
      console.log(err);
    }
  });

};

const removeById = (personId, done) => {
  
  Person.findOneAndRemove({ _id: personId }, (err, removedData) => {
    if(!err) {
      done(null , removedData);
      console.log(`Found and Removed ID: ${removedData}`)
    } else {
      console.log(err);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, deletedName) => {
    if(!err) {
      done(null, deletedName);
      console.log(`Deleted ${deletedName} Successfully.`)
    } else {
      console.log(err);
    };
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  
  const findPerson = 
    Person
    .find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if(!err) {
      done(null, data);
      console.log(`Chained Successfully. Results:\n ${data}`)
      } else {
        console.log(err);
      };
    });
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
