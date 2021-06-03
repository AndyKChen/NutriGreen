import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import Donation from '../models/donation';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from "../util/helpers";

const userRouter = express.Router();
userRouter.post("", async (req, res) => {
  try {
    // Collect data from request body
    const { username, name, password, age, weight, height, gender } = req.body;
    const amountDonated = 0;

    // validate user
    await Joi.validate({ username, password }, signUp);

    // create User and DonationProfile objects
    const newUser = new User({ username, name, password, age, weight, height, gender });
    const newDonationProfile = new Donation({username, amountDonated})
    const sessionUser = sessionizeUser(newUser);

    // Save in database
    await newUser.save();
    await newDonationProfile.save();

    // create new session to send to the client
    req.session.user = sessionUser
    res.send(sessionUser);
  } catch (err) {
    res.status(400).send(parseError(err));
  }
});

userRouter.get('/:username', (req, res) => {
  User.findOne({username:req.params.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error ' + err))
});

userRouter.post('/update/:username', (req, res) => {
  const update = {age: req.body.age, 
                  height: req.body.height, 
                  weight: req.body.weight, 
                  gender: req.body.gender, 
                  calorie_target: req.body.calorie_target,
                  ghg_limit: req.body.ghg_limit}
  const filter = {username: req.params.username}
  User.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
    console.log(doc);
  })})

export default userRouter;