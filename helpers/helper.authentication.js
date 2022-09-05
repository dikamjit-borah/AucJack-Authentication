const bcrypt = require('bcrypt')

module.exports = {
    async encodePassword(userPassword) {
        const SALT = bcrypt.genSaltSync()
        return bcrypt.hash(userPassword, SALT)
    },

    validatePassword(userPassword, hashedPassword) {
        return bcrypt.compareSync(userPassword, hashedPassword)
    }
}