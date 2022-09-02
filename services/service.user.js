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
    }
}