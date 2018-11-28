const electron = require('electron');
const remote = electron.remote;

$("#login-button").click(function (event) {
		 event.preventDefault();
	 
	 $('form').fadeOut(500);
    $('.wrapper').addClass('form-success');
    if (document.getElementById("user").value = "ii") {
        setTimeout(close, 2000);
    }

 });

function close() {
    var window = remote.getCurrentWindow();
    window.hide();
}