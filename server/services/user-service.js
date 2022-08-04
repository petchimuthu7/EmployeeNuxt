const fs = require("fs")
var array = require("lodash/array");
var object = require("lodash/fp/object");
const underscore = require("underscore")

class UserService {
    async login(email, password) {
        var userList = JSON.parse(fs.readFileSync("./user-details.json", 'utf8'));
        if (userList != null && userList.length > 0) {
            var user = underscore.where(userList, { EmailAddress: email, Password: password });
            console.log(user)
            if (user != null && user.length > 0) {
                return {
                    Status: "Success",
                    UserId: user[0].UserId,
                    UserName: user[0].UserName,
                    EmailAddress: user[0].EmailAddress,
                    MobileNumber: user[0].MobileNumber
                };
            }else{
                return {
                    Status: "Failure",
                    Message: "Invalid Email address and Password"
                }
            }
        }
    }
}

module.exports = new UserService()