'use-script'
window.onload = function() {
  document.querySelector('#loader').classList.add("hidden");
};

document.querySelector('.form-control').addEventListener('focus', hoverInput());

function hoverInput() {
	document.querySelector('.form-control').classList.add("hidden")
}

function scrollTo(element) {
	window.scroll({
		behavior: 'smooth',
		left: 0,
		top: element.offsetTop
	});
}

document.getElementById("button").addEventListener('click', () => {
	scrollTo(document.getElementById("8"));
});