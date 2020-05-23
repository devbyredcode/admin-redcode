const isLogin = (req, res, next) => {
    if(req.session.user == null || req.session.user ==  undefined) {
        // localStorage.removeItem('admin_username');
        res.redirect('/');
    }else{
        // localStorage.setItem('admin_username',req.session.user.username);
        console.log(req.session.user);
        next();
    }
}

module.exports = isLogin;