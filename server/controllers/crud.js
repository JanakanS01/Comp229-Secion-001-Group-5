let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Reference for Survey Model
let Survey = require('../models/survey');

module.exports.processAddPage = (req, res, next) =>{
    let newSurvey = Survey({
        "surveyName" : req.body.surveyName,
        "surveyOwner" : req.body.surveyOwner,
        //"questions" : req.body.questions
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            conosle.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys');
        }
    });
};

module.exports.displayUpdatePage = (req, res, next) =>{
    let id = req.params.id;

    Survey.findById(id, (err, updateSurveyPage) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show update page
            res.render('surveys/edit', {title: 'Update Survey', survey: updateSurveyPage});
        }
    });
}

module.exports.processUpdatePage = (req, res, next) =>{
    let id = req.params.id

    let updateSurvey = Survey({
        "_id" : id,
        "surveyName" : req.body.surveyName,
        "surveyOwner" : req.body.surveyOwner,
        //"questions" : req.body.questions
    });

    Survey.updateOne({_id: id}, updateSurvey, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys');
        }
    });
};

module.exports.deleteFunc = (req, res, next) =>{
    let id = req.params.id;

    Survey.remove({_id: id}, (err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/surveys');
        }
    })
};