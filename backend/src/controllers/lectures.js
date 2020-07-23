const status = require('http-status');

const lectureModel = require('../models/lectures');
const subjectModel = require('../models/subjects')
const classModel = require('../models/classes')
const userModel = require('../models/users')
const has = require('has-keys');
const moment = require('moment')
const { Op } = require('sequelize')

module.exports = {
    async getLectures(req, res){
        let data =  await lectureModel.findAll({include: [
            { model: subjectModel, as: 'subject'},
            { model: classModel, as: 'classes'},
            { model: userModel, as: 'professor'}
        ]})
        res.json({status: true, message: 'Returning lectures', data});

    },
    async newLecture(req, res){
        if(!has(req.body, ['sub_id', 'class_id', 'prof_id', 'lec_date', 'lec_start_time']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the lecture details'};

        //check if prof and class is available on the specified date n time
        lectureModel.findAndCountAll({where: {prof_id: req.body.prof_id, class_id: req.body.class_id, lec_date: req.body.lec_date,lec_start_time:req.body.lec_start_time}}).then((clashes)=>{
            if(clashes.count>0){
                res.json({status: false, message: 'Lecture clashes with other lectures'});
            }
            else{
                mDate = moment(new Date(req.body.lec_date))
                startOfWeek = mDate.startOf('isoWeek')
                startOfWeek = startOfWeek.year()+"/"+(startOfWeek.month()+1)+"/"+startOfWeek.date()
                endOfWeek = mDate.endOf('week').subtract(1,'days')
                endOfWeek = endOfWeek.year()+"/"+(endOfWeek.month()+1)+"/"+endOfWeek.date()
                lectureModel.findAndCountAll({where: {prof_id: req.body.prof_id, lec_date:{
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }},group: ['lec_date']}).then((profLecs)=>{
                    profWeeklyHours = 0
                    profDailyHours = 0
                    profLecs.count.map((ele)=>{
                        profWeeklyHours += ele.count
                        if(ele.lec_date == req.body.lec_date)
                            profDailyHours = ele.count 
                    })
                    //lectures per day check for professor
                    if(profDailyHours<4 && profWeeklyHours<18){
                        lectureModel.findAndCountAll({where: {class_id: req.body.class_id, lec_date:{
                            [Op.gte]: startOfWeek,
                            [Op.lte]: endOfWeek
                        }},group: ['lec_date']}).then((classLecs)=>{
                            classWeeklyHours = 0
                            classDailyHours = 0
                            classLecs.count.map((ele)=>{
                                classWeeklyHours += ele.count
                                if(ele.lec_date == req.body.lec_date)
                                    classDailyHours = ele.count
                            })
                            //lectures per day check for class
                            if(classDailyHours<6 && classWeeklyHours<25){
                                let { sub_id, class_id, prof_id, lec_date, lec_start_time } = req.body
                                lectureModel.create({ sub_id, class_id, prof_id, lec_date, lec_start_time }).then(()=>{
                                    res.json({status: true, message: 'Lecture Added'});
                                });
                            }else{
                                res.json({status: true, message: 'Students cannot have more than 6 lectures a day or 25 lectures a week'});
                            }
                        });
                    }else{
                        res.json({status: true, message: 'Professor cannot take more than 4 lectures a day or 18 lectures a week'});
                    }
                })  
            }
        });
    },
}