var mysqlConnection = require('../controllers/mySQL');



mysqlConnection.makeQuery = (sql, args) => {
        return new Promise((resolve, reject) => {
            mysqlConnection.query(sql, args, function (err, rows) {
                if(err) {
                    console.log(err);
                    return reject(err);
                } else {
                    console.log(rows);
                    return resolve(rows);
                }
            })
        })
};

mysqlConnection.getData = (sql, args) => {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(sql, args, function(err, results) {
            if(err) {
                console.log(err);
                return reject(err);
            } else if(results.length > 0) {
                console.log(results);
                return resolve(false);
            } else {
                return resolve(true);
            }
        })
    })
};

module.exports = mysqlConnection;