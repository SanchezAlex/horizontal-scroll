/* frameworks */
//=include ../../dist/bower_components/jquery/dist/jquery.js
//=include ../../dist/bower_components/moff/dist/moff.min.js
//=include ../../dist/bower_components/fullpage.js/vendors/scrolloverflow.min.js
//=include ../../dist/bower_components/fullpage.js/dist/jquery.fullpage.min.js
//=include ../../dist/bower_components/jquery-ui/jquery-ui.min.js


/* libs */
//=include lib/modernizr-custom.js

/* plugins */

/* separate */
//=include helpers/object-fit.js
//=include separate/global.js

/* components */


window.moffConfig = {
	// Website CSS breakpoints.
	// Default values from Twitter Bootstrap.
	// No need to set xs, because of Mobile first approach.
	breakpoints: {
		sm: 768,
		md: 992,
		lg: 1200
	},
	loadOnHover: true,
	cacheLiveTime: 2000
};

// the main code

class App {

	initEvents() {

		// hide preloader

		setTimeout(function () {
			document.querySelector('.preloader').style.display = "none";

			document.body.classList.remove('no-scroll');
		}, 1000);

	}


	initHorizontalScroll() {

		// init horizontal scroll

		let sections = document.querySelectorAll('.page'), tl = new TimelineLite({ paused:true });

		for(let i = 0; i < sections.length; i++) {

			let dotsElem = document.getElementsByClassName('info__dots');

			[].forEach.call(dotsElem, function (elem) {

				let createDot = document.createElement('span');
				createDot.className = 'info__dots__item';
				createDot.id = 'dot' + i;
				createDot.addEventListener('click',function() {
					tl.seek(this.id).pause();

				});


				elem.appendChild(createDot);
			});

			if(i !== 0) {

				tl.addPause('dot' + i);

			}

			if(i !== sections.length - 1) {

				tl.to(sections[i], 0.5,{ scale:.8, ease:Back.easeOut })
					.to(sections[i], 0.7, { xPercent:-100, rotationY:80 }, 'L'+i)
					.from(sections[i+1], 0.7, { xPercent:100,rotationY:-80 }, 'L'+i)
					.from(sections[i+1], 0.5, { scale:.8, ease:Back.easeIn })
			}
		}

		function initSlide(e) {
			let check = isNaN(e) ? e.wheelDelta || -e.detail : e;
			if( check < 0) {
				tl.play();
			} else {
				tl.reverse();
			}
		}


		document.addEventListener("mousewheel", initSlide);
		document.addEventListener("DOMMouseScroll", initSlide);
	}

	run() {

		this.initEvents();
		this.initHorizontalScroll();

	}
}

document.addEventListener('DOMContentLoaded', function() {

	const app = new App();

	app.run();
});


























