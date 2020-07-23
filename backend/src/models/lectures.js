
const Sequelize = require('sequelize');

const db = require('./database.js');


const lectures = db.define('tblLectures', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    sub_id: {
        type: Sequelize.INTEGER,
        foreignKey: 'fk_subject_id'
    },
    class_id: {
        type: Sequelize.INTEGER,
        foreignKey: 'fk_class_id'
    },
    prof_id: {
        type: Sequelize.INTEGER,
        foreignKey: 'fk_prof_id'
    },
    lec_date: {
        type: Sequelize.DATEONLY
    },
    lec_start_time: {
        type: Sequelize.TIME
    }
})


module.exports = lectures;