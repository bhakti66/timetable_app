const status = require('http-status');

const subjectModel = require('../models/subjects');


const has = require('has-keys');


module.exports = {
    async getSubjects(req, res){
        let data =  await subjectModel.findAll()
        res.json({status: true, message: 'Returning subjects', data});

    },
    async newSubject(req, res){
        if(!has(req.body, ['sub_name']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the subject name'};

        let { sub_name } = req.body;
        await subjectModel.create({ sub_name });

        res.json({status: true, message: 'Subject Added'});
    },
}