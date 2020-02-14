const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// const RecipeModel = mongoose.model('RecipeModel', recipeSchema);

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(self => {
    console.log(`Connected to the database: "${self.connections[0].name}"`);
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Mousse',
      level: 'Easy Peasy',
      ingredients: ['Chocolat, something'],
      cuisine: 'Portuguese',
      dishType: 'Dessert',
      duration: 10,
      creator: 'David'
    });
  })
  .then(recipe => {
    console.log(recipe);
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })

  // .then(recipe => console.log(recipe.title))

  .then(() => {
    return mongoose.disconnect();
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
