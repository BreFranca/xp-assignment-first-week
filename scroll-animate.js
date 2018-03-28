(function () {
	var d = document;

	function init() {
		//Links 
		var anchor1Link = d.getElementById('anchor1Link');
		var anchor2Link = d.getElementById('anchor2Link');
		var anchor3Link = d.getElementById('anchor3Link');
        var anchor4Link = d.getElementById('anchor4Link');

		//Anchors
		var anchor1 = d.getElementById('banner');
		var anchor2 = d.getElementById('about');
		var anchor3 = d.getElementById('frameworks');
		var anchor4 = d.getElementById('contact');

		anchor1Link.addEventListener('click', function (e) {
			e.preventDefault();
			scrollTo(anchor1, e);
		}, false);
		anchor2Link.addEventListener('click', function (e) {
			e.preventDefault();
			scrollTo(anchor2, e);
		}, false);
		anchor3Link.addEventListener('click', function (e) {
			e.preventDefault();
			scrollTo(anchor3, e);
		}, false);
		anchor4Link.addEventListener('click', function (e) {
			e.preventDefault();
			scrollTo(anchor4.offsetTop, e);
		}, false);
	}

	function scrollTopValue(domElement) {
		//DEBUG
		return 'scrollTopValue:', domElement.scrollTop;
	}
	function offsetTopValue(domElement) {
		//DEBUG
		return 'offsetTopValue:', domElement.offsetTop;
	}

	//cf. https://gist.github.com/james2doyle/5694700
	// requestAnimationFrame for Smart Animating https://goo.gl/sx5sts
	var requestAnimFrame = function () {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	}();

	function scrollTo(to, callback) {
		var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1500;
		if (isDomElement(to)) {
			// console.log('this is an element:', to); //DEBUG
			to = to.offsetTop - 70;
		}

		// because it's so fucking difficult to detect the scrolling element, just move them all
		function move(amount) {
			document.documentElement.scrollTop = amount;
			document.body.parentNode.scrollTop = amount;
			document.body.scrollTop = amount;
		}

		function position() {
			return document.documentElement.offsetTop || document.body.parentNode.offsetTop || document.body.offsetTop;
		}

		var start = position(),
		    change = to - start,
		    currentTime = 0,
		    increment = 30;

		var animateScroll = function animateScroll() {
			// increment the time
			currentTime += increment;
			// find the value with the quadratic in-out easing function
			var val = Math.easeInOutQuad(currentTime, start, change, duration);
			// move the document.body
			move(val);
			// do the animation unless its over
			if (currentTime < duration) {
				requestAnimFrame(animateScroll);
			} else {
				if (callback && typeof callback === 'function') {
					// the animation is done so lets callback
					callback();
				}
			}
		};

		animateScroll();
	}

	init();
})();

//-------------------- Unimportant js functions --------------------
// easing functions https://goo.gl/5HLl8
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return c / 2 * t * t + b;
	}
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
	var tc = (t /= d) * t * t;
	return b + c * tc;
};

Math.inOutQuintic = function (t, b, c, d) {
	var ts = (t /= d) * t,
	    tc = ts * t;
	return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

function isDomElement(obj) {
	return obj instanceof Element;
}

function isMouseEvent(obj) {
	return obj instanceof MouseEvent;
}

function findScrollingElement(element) {
	//FIXME Test this too
	do {
		if (element.clientHeight < element.scrollHeight || element.clientWidth < element.scrollWidth) {
			return element;
		}
	} while (element = element.parentNode);
}