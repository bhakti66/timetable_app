
const Sequelize = require('sequelize');

const db = require('./database.js');


const roles = db.define('tblRoles', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    role_name: {
        type: Sequelize.STRING
    }
})


module.exports = roles;