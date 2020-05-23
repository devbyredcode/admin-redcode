const bcrypt = require('bcrypt');
const User = require('../model/User');

module.exports = {
    viewLogin : (req, res) => {
        const alertMessage = req.flash('alert_message');
        const alertStatus = req.flash('alert_status');
        const alert = {
            message: alertMessage,
            status : alertStatus
        };
        if(req.session.user == null || req.session.user ==  undefined) {
            res.render('admin/index', {
                alert
            });
        }else{
            res.redirect('/admin/dashboard');
        }
    },

    actionLogin : async (req, res) => {
        try {
            const { input_username, input_password } = req.body;
            const isUserExist = await User.findOne({ username : input_username });
            
            if(!isUserExist){
                showNotification(req, "Wrong Username or Password", "Danger");
                res.redirect('/');
            }

            const isPasswordMatch = await bcrypt.compare(input_password, isUserExist.password);

            if(!isPasswordMatch) {
                showNotification(req, "Wrong Username or Password", "Danger");
                res.redirect('/');
            }

            const hour = 3600000
            req.session.cookie.expires = new Date(Date.now() + hour)
            req.session.cookie.maxAge = hour
            req.session.user = { id : isUserExist.id, username: isUserExist.username }

            res.redirect('/admin/dashboard');
        } catch (err) {
            console.log(err);
        }
    },

    actionLogout : (req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}

const netralizeInput = (params) => {
    return params.toLowerCase();
}

const showNotification = (req, message, status) => {
    req.flash('alert_message', message);
    req.flash('alert_status', netralizeInput(status));
}