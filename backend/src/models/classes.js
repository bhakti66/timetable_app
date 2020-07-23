
const Sequelize = require('sequelize');

const db = require('./database.js');


const classes = db.define('tblClasses', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    class_name: {
        type: Sequelize.STRING
    },
    division: {
        type: Sequelize.STRING
    }
})


module.exports = classes;