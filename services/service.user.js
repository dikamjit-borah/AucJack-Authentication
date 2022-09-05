const modelUser = require("../models/model.user")

module.exports = {
    createUser: async (userData) => {
        let isCreated = false
        let err
        try {
            const result = await modelUser.insertMany(userData)
            isCreated = result ? true : false
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return { isCreated, err }
    },

    findUser: async (userPhone) => {
        let userFound = false
        let userData
        let err
        try {
            const result = await modelUser.find({
                userPhone
            })
            if (result && result.length > 0) {
                userFound = true
                userData = result
            }

        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            err,
            userFound,
            userData
        }
    }
}