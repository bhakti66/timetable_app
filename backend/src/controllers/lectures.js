const status = require('http-status');

const lectureModel = require('../models/lectures');


const has = require('has-keys');


module.exports = {
    async getLectures(req, res){
        let data =  await lectureModel.findAll()
        res.json({status: true, message: 'Returning lectures', data});

    },
    async newLecture(req, res){
        if(!has(req.body, ['sub_id', 'class_id', 'prof_id', 'lec_date', 'lec_start_time']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the lecture details'};

        //prof hours/day and hours/week check
        lectureModel.findAndCountAll({where: {prof_id: req.body.prof_id, lec_date: req.body.lec_date}}).then((profLecs)=>{
            //lectures per day check
            if(profLecs.count<4){
                
            }
        })  

        
        //classes hours/day and hours/week check
        
        res.json({status: true, message: 'Lecture Added'});
    },
}