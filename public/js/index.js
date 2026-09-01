//
//
// Index JS
//
//



(function ($) {
	'use strict';



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Page load

	function pageFunctions() {


		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Show content

		// Wait until first image has loaded
		$('.page__content').find('img:first').imagesLoaded( function() {
	
			// Portfolio grid layout
			$('.portfolio-wrap').imagesLoaded( function() {
				$('.portfolio-wrap').masonry({
					itemSelector: '.portfolio-item',
					transitionDuration: 0
				});
			});

			// Blog grid layout
			$('.blog-wrap').imagesLoaded( function() {
				$('.blog-wrap').masonry({
					itemSelector: '.blog-post',
					transitionDuration: 0
				});
			});

			// Show the content
			$('body').removeClass('loading');

			// Hide the menu
			$('body').removeClass('menu--open');
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Active links

		// Switch active link states
		$('.active-link').removeClass('active-link');
		$('a[href="' + navTarget + '"]').addClass('active-link');



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Galleries

		// Destroy all existing waypoints
		Waypoint.destroyAll();

		// Set up count for galleries to give them unique IDs
		var galleryCount = 0;

		// If there's a gallery
		$('.gallery').each( function() {

			// Get gallery element
			var $this = $(this);

			// Add ID via count
			galleryCount++;
			var thisId = 'gallery-' + galleryCount;
			$this.attr('id', thisId);

			// Gallery columns
			var galleryCols = $this.attr('data-columns');

			// Set up gallery container
			$this.append('<div class="gallery__wrap"></div>');

			// Add images to container
			$this.children('img').each( function() {
				$(this).appendTo('#' + thisId + ' .gallery__wrap');
			});

			// Wrap images
			$this.find('.gallery__wrap img').each( function() {
				var imageSrc = $(this).attr('src');
				$(this).wrapAll('<div class="gallery__item"><a href="' + imageSrc + '" class="gallery__item__link"></div></div>').appendTo();
			});

			// If it's a single column gallery
			if ( galleryCols === '1' ) {

				// Wait for images to load (carousels need all images)
				$this.imagesLoaded( function() {

					// Add carousel class to gallery
					$this.addClass('gallery--carousel');

					// Add owl styles to gallery wrap
					$this.children('.gallery__wrap').addClass('owl-carousel');

					// Use carousel
					$this.children('.gallery__wrap').owlCarousel({
						items: 1,
						loop: true,
						mouseDrag: false,
						touchDrag: true,
						pullDrag: false,
						dots: true,
						autoplay: false,
						autoplayTimeout: 6000,
						autoHeight: true,
						animateOut: 'fadeOut'
					});

					// When scrolling over the bottom
					var waypoint1 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}

							if ( direction === 'up') {
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}
						},
						offset: '-100%'
					});

					// When scrolling over the top
					var waypoint2 = new Waypoint({
						element: document.getElementById(thisId),
						handler: function(direction) {

							if ( direction === 'down') {
								$this.children('.gallery__wrap').trigger('play.owl.autoplay');
							}

							if ( direction === 'up') {
								$this.children('.gallery__wrap').trigger('stop.owl.autoplay');
							}
						},
						offset: '100%'
					});

					// Show gallery once initialized
					$this.addClass('gallery--on');
				});

			}

			else {

				$this.addClass('gallery--grid');

				// Init masonry immediately, re-layout as lazy images load
				var $wrap = $this.children('.gallery__wrap');
				$wrap.masonry({
					itemSelector: '.gallery__item',
					transitionDuration: 0
				});

				// Re-layout masonry as each image loads
				$wrap.imagesLoaded().progress( function() {
					$wrap.masonry('layout');
				});

				// Collect images for lightbox and bind click
				(function(gallery) {
					var urls = [];
					gallery.find('.gallery__item__link').each(function() {
						urls.push($(this).attr('href'));
					});
					gallery.find('.gallery__item__link').each(function(i) {
						$(this).on('click', function(e) {
							e.preventDefault();
							window.openLightbox(urls, i);
						});
					});
				})($this);

				// Show gallery once initialized
				$this.addClass('gallery--on');
			}

		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Images

		$('.single p > img').each( function() {
			var thisP = $(this).parent('p');
			$(this).insertAfter(thisP);
			$(this).wrapAll('<div class="image-wrap"></div>');
			thisP.remove();
		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Videos

		// For each iframe (skip ones with inline style, those are manually laid out)
		$('.single iframe').not('[style]').each( function() {

			// If it's YouTube or Vimeo
			if ( $(this).attr('src').indexOf('youtube') >= 0 || $(this).attr('src').indexOf('vimeo') >= 0 ) {

				var width = $(this).attr('width');
				var height = $(this).attr('height');
				var ratio = (height/width)*100;

				// Wrap in video container
				$(this).wrapAll('<div class="video-wrap"><div class="video" style="padding-bottom:' + ratio + '%;"></div></div>');

			}

		});



		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Tables

		$('.single table').each(function () {
			$(this).wrapAll('<div class="table-wrap"></div>');
		});

	}

	// Run functions on load
	pageFunctions();


	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Menu

	$(document).on('click', '.js-menu-toggle', function (){

		// If already open
		if ( $('body').hasClass('menu--open') ) {
			$('body').removeClass('menu--open');
		}

		// If not open
		else {
			$('body').addClass('menu--open');
		}
	});

	$(document).on('click', '.menu__list__item__link', function (){

		// If menu is open when you click a link on mobile
		if ( $('.menu').hasClass('menu--open') ) {
			$('.menu').removeClass('menu--open');
		}
	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Contact Form

	// Override the submit event
	$(document).on('submit', '#contact-form', function (e) {

		// Clear previous classes
		$('.contact-form__item--error').removeClass('contact-form__item--error');

		// Get form elements
		var emailField = $('.contact-form__input[name="email"]');
		var nameField = $('.contact-form__input[name="name"]');
		var messageField = $('.contact-form__textarea[name="message"]');
		var gotchaField = $('.contact-form__gotcha');

		// Validate email
		if ( emailField.val() === '' ) {
			emailField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate name
		if ( nameField.val() === '' ) {
			nameField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// Validate message
		if ( messageField.val() === '' ) {
			messageField.closest('.contact-form__item').addClass('contact-form__item--error');
		}

		// If all fields are filled, except gotcha
		if ( emailField.val() !== '' && nameField.val() !== '' && messageField.val() !== '' && gotchaField.val().length === 0 ) {

			// Submit the form!
		}

		else {

			// Stop submission
			e.preventDefault();
		}

	});



	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Lightbox

	var lb = document.getElementById('lightbox');
	var lbImg = document.getElementById('lightbox-img');
	var lbCounter = document.getElementById('lightbox-counter');
	var lbImages = [];
	var lbIndex = -1;

	function showLightbox(images, index) {
		lbImages = images;
		lbIndex = index;
		lbImg.src = lbImages[lbIndex];
		lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;
		lb.style.display = 'flex';
		document.body.style.overflow = 'hidden';
		updateArrows();
	}

	function closeLightbox() {
		lb.style.display = 'none';
		lbImg.src = '';
		document.body.style.overflow = '';
	}

	function lbPrev() {
		if (lbIndex > 0) showLightbox(lbImages, lbIndex - 1);
	}

	function lbNext() {
		if (lbIndex < lbImages.length - 1) showLightbox(lbImages, lbIndex + 1);
	}

	function updateArrows() {
		document.getElementById('lightbox-prev').style.display = lbIndex > 0 ? '' : 'none';
		document.getElementById('lightbox-next').style.display = lbIndex < lbImages.length - 1 ? '' : 'none';
	}

	// Expose globally so inline scripts (tangible dreams etc.) can use it
	window.openLightbox = showLightbox;

	document.getElementById('lightbox-close').onclick = closeLightbox;
	document.getElementById('lightbox-prev').onclick = lbPrev;
	document.getElementById('lightbox-next').onclick = lbNext;

	// Close on background click
	lb.addEventListener('click', function(e) {
		if (e.target === lb) closeLightbox();
	});

	// Keyboard nav
	document.addEventListener('keydown', function(e) {
		if (lb.style.display === 'none') return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') lbPrev();
		if (e.key === 'ArrowRight') lbNext();
	});

	// Touch swipe support
	(function() {
		var startX = 0;
		lb.addEventListener('touchstart', function(e) {
			startX = e.changedTouches[0].screenX;
		}, {passive: true});
		lb.addEventListener('touchend', function(e) {
			var diff = e.changedTouches[0].screenX - startX;
			if (Math.abs(diff) > 50) {
				if (diff > 0) lbPrev();
				else lbNext();
			}
		}, {passive: true});
	})();



}(jQuery));