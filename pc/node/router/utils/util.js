var crypto = require('crypto');
exports.md5 = function(str) {
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(str).digest("hex");
    return newPas
}
