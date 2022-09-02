const { OK } = require("http-status")
const httpStatus = require("http-status")
const serviceUser = require("../services/service.user")
const basicUtils = require("../utils/basic.utils")
const constants = require("../utils/constants")

module.exports = {
    signUp: async function (req, res) {
        const { userName, userPassword, userPhone, userEmail, userType, userRole } = { ...req.body }
        const userData = {
            userName,
            userPassword,
            userPhone,
            userEmail,
            userType,
            userRole
        }
        try {
            const result = await serviceUser.createUser(userData)
            if (result) {
                if (result.isCreated) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SIGNUP_SUCCESS)
                if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNUP_ERR, { error: err })
            }
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNUP_FAIL)
        } catch (error) {
            console.log(error);
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, { error: "" + error })
        }
    },

    authenticate: function (req, res) {
    }
}