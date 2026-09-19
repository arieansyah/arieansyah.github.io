(function () {
	'use strict';

	var nav = document.getElementById('siteNav');

	function onScroll() {
		nav.classList.toggle('scrolled', window.scrollY > 24);
	}

	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

	// Stagger siblings so grids/lists cascade in.
	revealEls.forEach(function (el) {
		var siblings = Array.prototype.slice.call(el.parentElement.children).filter(function (child) {
			return child.classList.contains('reveal');
		});
		var idx = siblings.indexOf(el);
		el.style.transitionDelay = Math.min(idx, 5) * 60 + 'ms';
	});

	if (reduceMotion || !('IntersectionObserver' in window)) {
		revealEls.forEach(function (el) {
			el.classList.add('in-view');
		});
	} else {
		var revealObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						entry.target.classList.add('in-view');
						revealObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
		);
		revealEls.forEach(function (el) {
			revealObserver.observe(el);
		});
	}

	// Highlight the nav link for the section currently in view.
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
	var sections = navLinks
		.map(function (link) {
			return document.querySelector(link.getAttribute('href'));
		})
		.filter(Boolean);

	if (sections.length && 'IntersectionObserver' in window) {
		var sectionObserver = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (!entry.isIntersecting) {
						return;
					}
					navLinks.forEach(function (link) {
						link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
					});
				});
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		sections.forEach(function (section) {
			sectionObserver.observe(section);
		});
	}
})();
