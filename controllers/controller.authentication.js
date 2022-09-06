const { OK } = require("http-status")
const httpStatus = require("http-status")
const helperAuthentication = require("../helpers/helper.authentication")
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
            const resultFindUser = await serviceUser.findUser(userPhone)
            if (resultFindUser && resultFindUser.userFound) {
                return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.USER_EXIST)
            }

            const encodedPassword = await helperAuthentication.encodePassword(userPassword)

            const resultCreateUser = await serviceUser.createUser({ ...userData, userPassword: encodedPassword })
            if (resultCreateUser) {
                if (resultCreateUser.isCreated) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SIGNUP_SUCCESS)
                if (resultCreateUser.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNUP_ERR, { error: resultCreateUser.err })
            }
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNUP_FAIL)
        } catch (error) {
            console.log(error)
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNUP_ERR, { error: "" + error })
        }
    },

    authenticate: async function (req, res) {
        const { userPhone, userPassword } = { ...req.body }
        try {
            const resultFindUser = await serviceUser.findUser(userPhone)
            if (resultFindUser) {
                if (!resultFindUser.userFound) return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.USER_NOT_EXIST)
                if (resultFindUser.userData && resultFindUser.userData[0] && resultFindUser.userData[0].userPassword) {
                    const hashedPassword = resultFindUser.userData[0].userPassword
                    const isValidPassword = await helperAuthentication.validatePassword(userPassword, hashedPassword)
                    return isValidPassword ? basicUtils.generateResponse(res, httpStatus.OK, constants.messages.SIGNIN_SUCCESS) : basicUtils.generateResponse(res, httpStatus.UNAUTHORIZED, constants.messages.SIGNIN_FAIL)
                }
            }
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNIN_ERR)

        } catch (error) {
            console.log(error)
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.SIGNIN_ERR, { error: "" + error })
        }
    }
}