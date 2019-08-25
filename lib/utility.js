var utility = {};

utility.parsejson = (str) => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return error
    }
}

module.exports = utility;