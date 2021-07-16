var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let survey = require('../models/survey');

let surveyController = require('../controllers/crud');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'NST Survey'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', {title: 'NST Survey'});
});

//Get create survey page
router.get('/create', function(req, res, next){
  res.render('create', {title: 'Create Survey'})
});

router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  
  //declare id for item associated with CRUD request
   let id=req.params.id;
   survey.findById(id,(err,surveys)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
        res.render('surveys/details',{
            title:'View and Edit Survey',survey:surveys
        });
    }
   });
  

});

    //Get existing survey page
// router.get('/surveyDB', function(req, res, next){
//   res.render('surveyDB', {title: 'Survey Page'})
// });

//Get survey page

router.get('/surveys', (req, res, next) => {
  // find all books in the books collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Survey',
        survey: surveys
      });
    }
    console.log("sdfsdfsd");
    console.log(surveys.surveyOwner);
  });

});

//Full CRUD operations
router.get('/create', surveyController.processAddPage);
router.get('/update:id', surveyController.displayUpdatePage);
router.get('/update:id', surveyController.processUpdatePage);
router.get('/delete:id', surveyController.deleteFunc);


module.exports = router;
