const electron = require('electron');
const path = require('path');
const remote = electron.remote;
const closeBtn = document.getElementById('closeBtn');
const addBtn = document.getElementById('addBtn');
const { shell } = require('electron');

const context = global.location.search;


input = context.replace("?", "");

if (input.split(';')[0]) {
    firstArg = input.split(';')[0].split('=')[1];
    document.getElementById("addBtn").value = "Add";
}
if (input.split(';')[1]) {
    secondArg = input.split(';')[1].split('=')[1];
    updatePage(secondArg);
    document.getElementById("addBtn").value = "Update";
}

function isRealValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
}


closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})


addBtn.addEventListener('click', function (event) {
    document.getElementById("addBtn").disabled = true;
    document.getElementById("closeBtn").disabled = true;

    var nome = document.getElementById("nome").value;
    var cv = document.getElementById('cv').value;
    var price = document.getElementById('price').value;
    var type = document.getElementById('type').options[document.getElementById('type').selectedIndex].value;
    var nomeImagem = document.getElementById('imagem').value;

    addToList(nome, cv, type, price, nomeImagem, context.substr(1, context.length - 1));


});


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
        con.query("SELECT nome, cv, type, price, image, orcamento FROM moldes Where id=" + id, function (err, result, fields) {
            if (err) throw err;
            console.log(result);

            document.getElementById('nome').value = result[0].nome;
            document.getElementById('cv').value = result[0].cv;
            document.getElementById('type').value = result[0].type;
            document.getElementById('price').value = result[0].price;
            document.getElementById('imagem').value = result[0].image;
            document.getElementById('image').src = "C:\\Users\\mg\\Desktop\\Base de dados\\" + result[0].orcamento + "\\Imagens\\" + result[0].image;
            
        });
    });

    document.getElementById("addBtn").disabled = false;
    document.getElementById("closeBtn").disabled = false;
    document.getElementById("addBtn").value = "Update";
}


function addToList(nome, cv, type, price, image, orcamento) {

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
    $query = 'Insert into moldes (nome, cv, type, price, image, orcamento) values ("' + nome + '","' + cv + '","' + type + '","' + price + '","' + image + '","' + orcamento + '")';

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
        document.getElementById("addBtn").disabled = false;
        document.getElementById("closeBtn").disabled = false;
    });



}
