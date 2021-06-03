import Nutrition from '../models/nutrition';
import Emission from '../models/emission';
import {PROJECT_ID, BUCKET_NAME, CLARIFAI_API_KEY, PHOTO_LINK} from '../config';

// moment package for time 
const moment = require('moment')
const today = moment().startOf('day')

const path = require('path');

const nutritionRouter = require('express').Router()

const multer = require('multer')

// Google Cloud Storage for photo images
const {Storage} = require('@google-cloud/storage')
const gc = new Storage({
  keyFilename: path.join(__dirname, '../fitness-images-c8edae6e3c57.json'),
  projectId: PROJECT_ID
})
const bucketName = BUCKET_NAME;

// Clarifai API
const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: CLARIFAI_API_KEY
});


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname+'/uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype =='image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

var upload = multer({storage: storage, fileFilter: fileFilter})

nutritionRouter.get('/:username', (req, res) => {
  Nutrition.find({username:req.params.username}).sort('-date')
    .then(nutritions => res.json(nutritions))
    .catch(err => res.status(400).json('Error: ' + err));
});

nutritionRouter.route('/add').post(upload.single("foodImage"), (req, res) => {

  const filename = req.file.path;

  // Uploads a local file to the bucket
  gc.bucket(bucketName).upload(filename, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    }
  }).then(() => { 
      console.log(filename + ' succesfully uploaded');

      // predict using the photo uploaded to google cloud
      const photo_link = PHOTO_LINK + req.file.filename
      app.models.predict("bd367be194cf45149e75f01d59f77ba7", photo_link).then(response => {

      var ingredients = [];

      for (var x in response.outputs[0].data.concepts) {
        if (response.outputs[0].data.concepts[x].value > 0.95) {
          ingredients.push(response.outputs[0].data.concepts[x].name) 
        }
      }

      console.log(ingredients);

      async function getEmissionTotal() {
        let emission_total = 0;
        for (var x in ingredients) {
            try {
                const result = await Emission.findOne({food_name:new RegExp('^'+ingredients[x]+'$', "i")});
                console.log(result);
                if (result == null) {
                    emission_total += 0;
                    console.log(emission_total);
                } else {
                    emission_total += result.emission;
                    console.log(emission_total);
                }
          } catch(err) {
              console.log(err);
          }  
       }
       return emission_total;
    }
      
      async function next() {
        // await calculation of total emission
        const result = await getEmissionTotal();
        
        // nutrtional info sent from client side
        const date = req.body.date; 
        const description = req.body.description; 
        const food_list = ingredients;
        const photo = photo_link;
        const nutrients = {
          'calories': req.body.calories,
          'fat': req.body.fat,
          'sugar': req.body.sugar,
          'carbs': req.body.carbs,
          'cholesterol': req.body.cholesterol,
          'protein': req.body.protein,
          'emissions': result
        }
        const username = req.body.username;
        
        console.log(nutrients);
          
        // Nutrition object to be saved in database
        const newNutrition = new Nutrition({
          date,
          description,
          photo,
          nutrients,
          food_list,
          username
        });

        console.log(newNutrition)

        newNutrition.save()
          .then(() => res.json('Nutrition added!'))
          .catch(err => res.status(400).json('Error: ' + err));
     
      }
      next();
      })
      .catch(err => console.log(err))
      
    })
    .catch(err => console.log(err))
  });


nutritionRouter.get('/:id', (req, res) => {
  Nutrition.findById(req.params.id)
    .then(nutrition => res.json(nutrition))
    .catch(err => res.status(400).json('Error: ' + err));
});

nutritionRouter.delete(':/id', (req, res) => {
  Nutrition.findByIdAndDelete(req.params.id)
    .then(() => res.json('Nutrition deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

nutritionRouter.post('/update/:id', (req, res) => {
  Nutrition.findById(req.params.id)
    .then(nutrition => {
      nutrition.date = req.body.date;
      nutrition.description = req.body.description;
      nutrition.nutrients = {
        'calories': (req.body.calories).toFixed(2),
        'fat': req.body.fat.toFixed(2),
        'sugar': req.body.sugar.toFixed(2),
        'carbs': req.body.carbs.toFixed(2),
        'cholesterol': req.body.cholesterol.toFixed(2),
        'protein': req.body.protein.toFixed(2)
    };
  
      nutrition.save()
        .then(() => res.json('Nutrition updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

nutritionRouter.get('/today/:username', (req, res) => {
  Nutrition.find({
    date: {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate()
    },
    username:req.params.username
  })
  .then(nutritions => res.json(nutritions))
  .catch(err => console.log(err));
});

nutritionRouter.get('/weekly/:username', (req, res) => {
  Nutrition.find({
    date:{
      $gte: moment(today).startOf('week').toDate(),
      $lte: moment(today).endOf('week').toDate()
    },
    username:req.params.username
  })
  .then(nutritions => res.json(nutritions))
  .catch(err => console.log(err));
})


export default nutritionRouter;