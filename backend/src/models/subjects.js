
const Sequelize = require('sequelize');

const db = require('./database.js');


const subjects = db.define('tblSubject', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    sub_name: {
        type: Sequelize.STRING
    }
})


module.exports = subjects;