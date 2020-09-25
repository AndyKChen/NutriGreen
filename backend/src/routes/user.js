import Joi from 'joi';
import express from 'express';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from "../util/helpers";

const userRouter = express.Router();
userRouter.post("", async (req, res) => {
  try {
    const { username, name, password, age, weight, height, gender } = req.body;
    await Joi.validate({ username, password }, signUp);

    const newUser = new User({ username, name, password, age, weight, height, gender });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

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