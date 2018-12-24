var crypto = require('crypto');
exports.md5 = function(str) {
    let md5 = crypto.createHash("md5");
    let newPas = md5.update(str).digest("hex");
    return newPas
}
exports.decodemd5 = function(str) {
    const decipher = crypto.createDecipher('aes192', str);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
