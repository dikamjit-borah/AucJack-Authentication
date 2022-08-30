module.exports = {
    signUp: function(req, res){

        const body = req.body
        const userName = req.body.userName
        const userPassword = req.body.userPassword
        const userType = req.body.userType
        const userRole = req.body.userRole
        
        res.send("signup")
    },
    authenticate: function(req, res) {
    }
}