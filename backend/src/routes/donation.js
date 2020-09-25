import Donation from '../models/donation';

const donationRouter = require('express').Router()

donationRouter.get('/:username', (req, res) => {
    Donation.find({username:req.params.username})
        .then(donations => res.json(donations))
        .catch(err => console.log(err))
})

donationRouter.post('/update/:username', (req, res) => {
    const update = {amountDonated: req.body.amountDonated}
    const filter = {username:req.params.username}

    Donation.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
        console.log(doc);
      })});

donationRouter.post('/add', (req, res) => {

    const newUser = new Donation({username: req.body.username, amountDonated: req.body.newAmount})

    newUser.save()
    .then(() => res.json('User added!'))
})

export default donationRouter;
        
