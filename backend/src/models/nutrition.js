import mongoose from 'mongoose';

const nutritionSchema = new mongoose.Schema({
  username: {type: String},
  date: { type: Date, required: true },
  description: { type: String, required: true },
  photo: {type: String},
  food_list: {type: Array},
  nutrients: {
      'calories': {
        type: Number
      },
      'fat': {
        type: Number
      },
      'sugar': {
          type: Number
      },
      'carbs': {
          type: Number
      },
      'cholesterol':{
          type: Number
      },
      'protein': {
          type: Number
      },
      'emissions': {
          type: Number
      }
  }
}, {
  timestamps: true,
});

const Nutrition = mongoose.model('Nutrients', nutritionSchema);
export default Nutrition;