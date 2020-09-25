import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
    username: {type:String},
    amountDonated : {type:Number}
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;