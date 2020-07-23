const status = require('http-status');

const classModel = require('../models/classes');


const has = require('has-keys');


module.exports = {
    async getClasses(req, res){
        let data =  await classModel.findAll()
        res.json({status: true, message: 'Returning classes', data});

    },
    async newClass(req, res){
        if(!has(req.body, ['class_name', 'division']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the class name and division'};

        let { class_name,division } = req.body;
        await classModel.create({ class_name, division });
        
        res.json({status: true, message: 'Class Added'});
    },
}