
const Sequelize = require('sequelize');

const db = require('./database.js');
const bcrypt = require("bcrypt");

const users = db.define('tblUsers', {
    id: {
        primaryKey: true,
        type: Sequelize.NUMBER
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    roleId: {
        type: Sequelize.INTEGER,
        foreignKey: 'fk_role_id'
    }
}, {
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    })

users.beforeCreate(function (user, options) {
    return bcrypt.hash(user.password, bcrypt.genSaltSync(8)).then((encrypted)=>{
        user.password = encrypted
    },(err)=>{
        console.err(err)
    });
});

users.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = users;