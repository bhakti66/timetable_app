const status = require('http-status');
const userModel = require('../models/users.js');
const roleModel = require('../models/roles');
const has = require('has-keys');
const auth = require('../util/auth')

module.exports = {
    async getUserById(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let {id} = req.params;

        let data = await userModel.findOne({where: {id}});

        if(!data)
            throw {code: status.BAD_REQUEST, message: 'User not found'};

        res.json({status: true, message: 'Returning user', data});
    },
    async getUsers(req, res){
        let data =  await userModel.findAll()
        res.json({status: true, message: 'Returning users', data});

    },
    async newUser(req, res){
        if(!has(req.body, ['first_name', 'email', 'password']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the name and email'};
        let role;
        if (req.body.isProfessor ){
            role = await roleModel.findOne({where:{role_name:'professor'}})
        }
        else{
            role = await roleModel.findOne({where:{role_name:'student'}})
        }
        let obj = req.body
        obj['roleId'] = role.id
        await userModel.create(obj);
        res.json({status: true, message: 'User Added'});
    },
    async updateUser(req, res){
        if(!has(req.body, ['id', 'name', 'email']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id, name and email'};

        let { id, name, email } = req.body;
    
        await userModel.updateUser({name, email}, {where:{id}});

        res.json({status: true, message: 'User updated'});
    },
    async deleteUser(req, res){
        if(!has(req.params, 'id'))
            throw {code: status.BAD_REQUEST, message: 'You must specify the id'};

        let { id } = req.params;

        await userModel.destroy({where: {id}});

        res.json({status: true, message: 'User deleted'});
    },
    async validateUser(req,res){
        if(!has(req.body, ['email', 'password']))
            throw {code: status.BAD_REQUEST, message: 'You must specify the email and password'};
        userModel.findOne({where: { email: req.body.email },include: [
            { model: roleModel, as: 'role'}
        ]}).then((user)=>{
            if (user!=null){
                if(user.validatePassword(req.body.password)){
                    user = user.toJSON()
                    token = auth.encode(user)
                    delete user.password
                    delete user.roleId
                    user.token = token
                    res.json({status: true, message: 'User Found',user});
                }
                else{
                    res.json({status: false, message: 'Invalid credentials'});
                }
            }
            else{
                res.json({status: false, message: 'User not Found'});
            }
        });
    },
    async getProfessors(req, res){
        role = await roleModel.findOne({where:{role_name:'professor'}})
        let data =  await userModel.findAll({where:{roleId:role.id}})
        res.json({status: true, message: 'Returning professors', data});
    }
}
