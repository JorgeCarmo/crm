const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const closeBtn = document.getElementById('closeBtn');
const addBtn = document.getElementById('addBtn');
const { shell } = require('electron');

const { ipcMain } = require('electron');


const fs = require('fs-extra');

var folderPath = 'C:\\\\Users\\\\mg\\\\Desktop\\\\Base de dados\\\\'

function isRealValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
}


const context = global.location.search;

console.log(context);

if (isRealValue(context.substr(1, context.length - 1))) {
    loadContacts();
    updatePage(context.substr(1, context.length - 1));
    document.getElementById('number').disabled = true;
    document.getElementById("addBtn").value = "Update";
} else {
    loadContacts();
    document.getElementById("addBtn").value = "Add";
    document.getElementById('number').disabled = true;
}

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

addBtn.addEventListener('click', function (event) {
    document.getElementById("addBtn").disabled = true;
    document.getElementById("closeBtn").disabled = true;
    document.getElementById("openFolderBtn").disabled = true;

    var number = document.getElementById("number").value;
    var start = document.getElementById('startdate').value;
    var end = document.getElementById('enddate').value;
    var type = document.getElementById('type').options[document.getElementById('type').selectedIndex].value;
    var detalhes = document.getElementById('details').value;
    var contactID = document.getElementById('contact').options[document.getElementById('contact').selectedIndex].value;
    var cliente = 0;
    if (document.getElementById('cliente').checked) {
        cliente = 1;
    }

    console.log("CHECKED OR NOT = ", cliente);

    if (isRealValue(number)) {
        updateList(number, start, end, type, detalhes, folderPath, contactID, cliente)
    } else {
        addToList(start, end, type, detalhes, folderPath, contactID, cliente);
    }

});


function openFile() {
    var start = document.getElementById('number').value;
    shell.openItem('C:\\Users\\mg\\Desktop\\Base de dados\\' + start);
};



function addToList(startdate, enddate, type, details, folderPath, contactID, cliente) {

    console.log("Add");


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
    $query = 'Insert into crm (startdate, enddate, type, details, path, contact, cliente) values ("' + startdate + '","' + enddate + '","' + type + '","' + details + '","' + folderPath + '","' + contactID + '","' + cliente + '")';

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        orcamentoID = rows.insertId;
        updatePage(orcamentoID);

        folderPath = folderPath + orcamentoID;
        // With Promises:
        fs.copy('C:\\Users\\mg\\Desktop\\Base de dados\\exemplo', folderPath)
            .then(() => {
                console.log('success!')
            })
            .catch(err => {
                console.error(err)
            })



        console.log("Query succesfully executed", rows);
    });


    // Close the connection
    connection.end(function () {
        // The connection has been closed
    });



}


function updateList(number, startdate, enddate, type, details, folderPath, contactID, cliente) {
    console.log("Update");
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
    $query = 'UPDATE crm set startdate = "' + startdate + '", enddate= "' + enddate + '",type= "' + type + '", details= "' + details + '", contact= "' + contactID  + '", cliente= "' + cliente + '" Where id = ' + number;
    console.log($query);
    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }
        updatePage(number);
        console.log("Query succesfully executed", rows);
    });


    // Close the connection
    connection.end(function () {
        // The connection has been closed
    });

}


function getContacts(callback) {
    var mysql = require('mysql');

    // Add the credentials to access your database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Moldegama2011',
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
    $query = 'SELECT `id`,`nome` FROM `contactos`';

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        callback(rows);

        console.log("Query succesfully executed");
    });

    // Close the connection
    connection.end(function () {
        // The connection has been closed
    });
}

function updatePage(id) {

    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Moldegama2011",
        database: "moldegama"
    });

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT startdate, enddate, type, details, path, contact, cliente FROM crm Where id=" + id, function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            document.getElementById('number').value = id;
            document.getElementById('startdate').value = result[0].startdate;
            document.getElementById('enddate').value = result[0].enddate;
            document.getElementById('type').value = result[0].type;
            document.getElementById('details').value = result[0].details;
            console.log(document.getElementById('contact').selectedIndex, " - ", result[0].contact);
            document.getElementById('contact').selectedIndex = result[0].contact - 1;
            if (result[0].cliente == 1) {
                document.getElementById('cliente').checked = true;
            } else {
                document.getElementById('cliente').checked = false;
            }


            loadPeca();
        });
    });

    document.getElementById("addBtn").disabled = false;
    document.getElementById("closeBtn").disabled = false;
    document.getElementById("openFolderBtn").disabled = false;
    document.getElementById("addBtn").value = "Update";
}


function getPecasDatabase(callback) {
    var mysql = require('mysql');

    // Add the credentials to access your database
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Moldegama2011',
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
    $query = 'SELECT `id`,`nome`, `cv`, `type`, `price`, `image` FROM `moldes` WHERE orcamento=' + context.substr(1, context.length - 1);

    connection.query($query, function (err, rows, fields) {
        if (err) {
            console.log("An error ocurred performing the query.");
            console.log(err);
            return;
        }

        callback(rows);
        console.log("Query succesfully executed");
    });

    // Close the connection
    connection.end(function () {
        // The connection has been closed
    });
}



function getPath() {
    return folderPath;


}


function createPeca() {
    // main process
    window.open('peca.html?' + document.getElementById("number").value, "", "height = 300,width = 300")
}


function newPecaWindow(id) {
    // main process
    window.open('peca.html?orc=' + document.getElementById("number").value +";id="+ id, "", "height = 300,width = 300")
}


function loadPeca() {
    getPecasDatabase(function (rows) {
        var html = '';

        rows.forEach(function (row) {
            html += '<tr>';
            html += '<td>';
            html += '<input type="button" onclick = "newPecaWindow(' + row.id + ')" value="Open" />';
            html += '</td>';
            html += '<td>';
            html += row.id;
            html += '</td>';
            html += '<td>';
            html += row.nome;
            html += '</td>';
            html += '<td>';
            if (isRealValue(row.cv)) {
                html += row.cv;
            }
            html += '</td>';
            html += '<td>';
            if (isRealValue(row.type)) {
                html += row.type;
            }
            html += '</td>';
            html += '<td>';
            if (isRealValue(row.price)) {
                html += row.price;
            }
            html += '</td>';
            html += '<td>';
            console.log(row.image);
            if (isRealValue(row.image)) {
                html += '<img src="' + row.image + '" style="width:60px;height:60px;">';
            }
            html += '</td>';
            html += '</tr>';
            console.log(row);
        });

        document.querySelector('#tableOut > tbody').innerHTML = html;
    });
}


function loadContacts() {
    getContacts(function (rows) {
        var html = '';

        rows.forEach(function (row) {
            if (isRealValue(path)) {
                html += '<option value="' + row.id + '">' + row.nome + '</option>';
            }
            console.log(row);
        });

        document.querySelector('#contact').innerHTML = html;
    });
}