import mongoose from 'mongoose';

const emissionSchema = new mongoose.Schema({
    food_name: {type: String},
    emission: {type: Number}
});

const Emission = mongoose.model('Emission', emissionSchema);

export default Emission;