const { app, BrowserWindow } = require('electron')

const { shell } = require('electron')



  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
      win = new BrowserWindow({ width: 1281, height: 800, minWidth: 1281, minHeight: 800 })

      win.on('close', function (e) {
          var choice = require('electron').dialog.showMessageBox(this,
              {
                  type: 'question',
                  buttons: ['Yes', 'No'],
                  title: 'Confirm',
                  message: 'Are you sure you want to quit?'
              });
          if (choice == 1) {
              e.preventDefault();
          }
      });

    // and load the index.html of the app.
    win.loadFile('index.html')
      win.openDevTools()
      win.once('ready-to-show', () => {
          win.show()
      })
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
      })

      let login = new BrowserWindow({ width: 600, height: 400, frame: false, parent: win, resizable: false })
      login.loadFile(`login.html`)
      login.show()
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
})
	
function openFolder(caminho) {
    shell.openItem(caminho);
}
  
  
function newContact(){
    window.open('contact.html');
}

function newWindow() {

    window.open('add.html');

}

function newInfoWindow(id) {

    window.open('add.html ? '+ id);

}

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

var mysql = require('mysql');

function el(selector) {
    return document.getElementById(selector);
}

function getFirstTenRows(callback) {
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
    $query = 'SELECT `id`,`details`, `type`, `startdate`, `enddate`, `path`, `contact`, `visible` FROM `crm`';

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



function getAllContacts(callback) {
    

    var mysql = require('mysql');
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

    $query = 'SELECT * FROM `contactos`';
    console.log($query);
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




function isRealValue(obj) {
    return obj && obj !== 'null' && obj !== 'undefined';
}

