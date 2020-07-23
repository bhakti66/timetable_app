
const Sequelize = require('sequelize');
const db = require('./database.js');
const subject = require('./subjects')
const classes = require('./classes')
const users = require('./users')

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
lectures.belongsTo(subject,{ foreignKey: 'sub_id', as:"subject" })
lectures.belongsTo(classes,{ foreignKey: 'class_id', as:"classes" })
lectures.belongsTo(users,{ foreignKey: 'prof_id', as:"professor" })

module.exports = lectures;