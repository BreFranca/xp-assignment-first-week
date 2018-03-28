'use-script'

var leads = [];

// LOADER
window.onload = function() {
	document.querySelector('#loader').classList.add("hidden");
};

// ACTIVE LEADS
document.getElementById("btn-send").addEventListener("click", convertLeads);

// SALVAR LEADS NO LOCAL STORAGE
function convertLeads() {
	if (!validationForm()) {
		return;
	}
	name = document.getElementById('form-nome').value;
    email = document.getElementById('form-email').value;
    company = document.getElementById('form-empresa').value;

	leads.unshift({"name":name , "email":email , "company":company});

	console.log(name);
	console.log(email);
	console.log(company);
	saveListStorage(leads);
	
	resetForm();
}

// VALIDAR FORMULÁRIO
function validationForm() {
	var name = document.getElementById('form-nome').value;
	var email = document.getElementById('form-email').value;
	var company = document.getElementById('form-empresa').value;

	var errors = '';
	if (name === '') {
		errors += '<p>Preencha o nome</p>';
	} else if(name.length <= 1) {
		errors += '<p>Insira o nome corretamente</p>';
	}

	if (email === '') {
		errors += '<p>Preencha o email!</p>';
	}

	if (company === '') {
		errors += '<p>Preencha a empresa</p>';
	} else if(company.length <= 1) {
		errors += '<p>Insira a empresa corretamente</p>';
	}

	if (errors != '') {
		document.getElementById("success").style.display = "none";
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
		return 0;
	} else {
		document.getElementById("errors").style.display = "none";
		document.getElementById("errors").innerHTML = " ";
		document.getElementById("success").style.display = "block";
		document.getElementById("success").innerHTML = '<p>Obrigado pelo seu interesse!</p>';
		return 1;
	}
}

// RECEBER SOMENTE LETRAS
document.getElementById("form-nome").onkeyup = function() {
    this.value = this.value.replace(/[^\w\.]|\d/g, '');
};

// RESETAR FORMULÁRIO
function resetForm() {
	document.getElementById('form-nome').value = "";
	document.getElementById('form-email').value = "";
	document.getElementById('form-empresa').value = "";
}

// SALVAR NO LOCAL STORAGE
function saveListStorage(leads) {
	var jsonStr = JSON.stringify(leads);
	localStorage.setItem("leads", jsonStr);
}

//FIXED MENU
var scrollpos = window.scrollY;
var header = document.getElementById("header");

window.addEventListener('scroll', function(){ 
    //Here you forgot to update the value
	scrollpos = window.scrollY;
	
	if(scrollpos >= 24) {
		header.classList.add("fixed");
	} else {
		header.classList.remove("fixed");
	}
});

// MENU MOBILE
var menu = document.querySelector('#btn-mobile');
var nav = document.querySelector('#nav-menu');
menu.addEventListener('click', function (e) {
	menu.classList.toggle('active');
	nav.classList.toggle('open');
}, false);