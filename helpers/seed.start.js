const TAG = "seed.start.js"
const seedUserTypes = require("../seeders/seed.user-types")
const seedUserRoles = require("../seeders/seed.user-roles")
const modelUserType = require("../models/model.user-type")
const modelUserRole = require("../models/model.user-role")
const basicUtils = require("../utils/basic.utils")

module.exports = {
    seedStart: async () => {
        try {
            await modelUserType.deleteMany({})
            await modelUserRole.deleteMany({})
            seedUserTypes.userTypes ? modelUserType.insertMany(seedUserTypes.userTypes) : null
            seedUserRoles.userRoles ? modelUserRole.insertMany(seedUserRoles.userRoles) : null
            basicUtils.logger(TAG, `Seeding successful for user-types and user-roles`)
        } catch (error) {
            basicUtils.logger(TAG, "" + error)
        }

    }
}