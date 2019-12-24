var mysql = require('mysql');



var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "csc317-termproject-team22",
    database: "csc317db"
    // debug: true
});



mysqlConnection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Connected!");
        
    }
});


mysqlConnection.query('SELECT * FROM users', function(error, rows, fields) {
    if(error) {
        console.log(error);
        console.log("Error in test query");
    } else {
        console.log("Successful test query");
    }
})

var test = {
    username: test
}
mysqlConnection.query('SELECT * FROM users WHERE username = ?', [test.username], function(error, rows, fields) {
    if(error) {
        console.log(error);
        console.log("Error in SELECT test query");
    } else if(rows.length) {
        console.log("Found something from SELECT test query");
    } else {
        console.log("Found nothing in SELECT test query, so successful");
    }
})


//Below code was used to test inserting, deleting, and selecting queries



// var username = "Test";

// var test = [
//     ["Test", "test@email.com", "Testpassword123!"]
// ];

// mysqlConnection.query('DELETE FROM users', function(error, result) {
//     if(error) {
//         console.log(error);
//         console.log("Error in DELETE test query");
//     } else {
//         console.log("Test account deleted");
//         console.log("Number of records deleted" + result.affectedRows);
//     }
// });

// mysqlConnection.query('INSERT INTO users (username, email, password) VALUES (?)', test, function(error, result) {
//     if(error) {
//         console.log(error);
//         console.log("Error in INSERT test query");
//     } else {
//         console.log("Test user successfully added");
//         console.log(result.insertId);
//         console.log(result.affectedRows);
//     }
// });


// mysqlConnection.query('SELECT * FROM users where username = ?', username, function(error, result, fields) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log("Successful SELECT test query");
//         console.log(result);
//     }
// })

module.exports = mysqlConnection;
