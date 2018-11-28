const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')
const addBtn = document.getElementById('addBtn')


closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

addBtn.addEventListener('click', function (event) {
    addToList();
})



function addToList() {

    var name = document.getElementById("name").value;
    var mail = document.getElementById("mail").value;
    var phone = document.getElementById("phone").value;

    var mysql = require('mysql');

    // Add the credentials to access your database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Moldegama2011', // or the original password : 'apaswword'
        database: 'moldegama'
    });

    // connect to mysql
    connection.connect(function (err) {
        // in case of error
        if (err) {
            console.log(err.code);
            console.log(err.fatal);
        }
    });

    // Perform a query
    $query = 'Insert into contactos (nome, numero, email) values ("' + name + '","' + phone + '","' + mail + '")';

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        console.log("Query succesfully executed", rows);
    });

    // Close the connection
    connection.end(function () {
        // The connection has been closed
        var window = remote.getCurrentWindow();
        window.close();
    });

}