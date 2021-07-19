var svgContainer = document.getElementById('svgPreloader');
var animItem = bodymovin.loadAnimation({
	wrapper: svgContainer,
	animType: 'svg',
	loop: true,
	path: 'assets/js/preloader.json'
});

// --------preloader--------------
$(window).on('load', function() {
	setTimeout(function() {
        $('.preloader').slideUp('slow');
      	$('.cube-wrapper').fadeOut();
    }, 1000);
	headerStuck();

	wow = new WOW({
		boxClass: 'wow',     
		animateClass: 'animate__animated',
		offset: 0,         
		mobile: true,      
		live: true       
	});
	 wow.init();
});

// --------header--------------
$(document).ready(function() {
	headerStuck();
	$('.toggle-btn, .close-menu, .menu-overlay-bg').on('click', function(){
		$('.menu-right-part').toggleClass('active');
		$('.menu-overlay-bg').toggleClass('active');
		
	});
	// menu top bar
	$('.mobileNav-wrapper').on('click', function(){
		$('.menu-top-part').toggleClass('active');
		$(this).toggleClass('active');
	});

	$(".nav-bar a").click(function() {
		var link = $(this);
		var closest_ul = link.closest(".ul-menu-list");
		var parallel_active_links = closest_ul.find(".active");
		var closest_li = link.closest(".menu-dropdown");
		var link_status = closest_li.hasClass("active");
		var count = 0;

		closest_ul.find(".ul-menu-list").slideUp(function() {
			console.log(closest_ul.find(".ul-menu-list").length)
			if (++count == closest_ul.find(".ul-menu-list").length){
				console.log('slideUp')
				parallel_active_links.removeClass("active");
				parallel_active_links.children(".ul-menu-list").removeClass("show-dropdown");
				link.not().children(".ul-menu-list").find('.menu-dropdown').removeClass(".active");
			}
		});

		if (!link_status) {
			console.log('slideDown')
				closest_li.children(".ul-menu-list").slideDown().addClass("show-dropdown");
				closest_li.addClass("active");
		}	

	});
	$(document).on('click', function(e) {
        e.stopPropagation();
        var user_info = $(".sub-menu").parents('.menu-dropdown');
        if (user_info.has(e.target).length === 0) {
            user_info.removeClass("active");
            $('.sub-menu').slideUp();
        }
   });

	$(window).on('load', function() {
		var headerheight = $('.header-wrapper').outerHeight();
		$('.content-area-container').css({"padding-top": headerheight+'px'});
	});
	$(window).on('resize', function() {
		var headerheight = $('.header-wrapper').outerHeight();
		$('.content-area-container').css({"padding-top": headerheight+'px'});
	});

	// --------select2-------
	$('.customSelect').each(function() {
		var dropdownParents = $(this).parents('.select2Part')
		$(this).select2({
			dropdownParent: dropdownParents,
			minimumResultsForSearch: -1
		});
	});
	$('.customSelectSearch').each(function() {
		var dropdownParents = $(this).parents('.select2Part');
		$(this).select2({
			dropdownParent: dropdownParents,
		});
		$('.customSelectSearch').select2().on('select2:open', function(e){
			$('.select2-search__field').attr('placeholder', 'Search Item');
		})
	});
	$('.customSelectSearchmultiple').each(function() {
		var dropdownParents = $(this).parents('.select2Part');
		var placehldrget = $(this).attr("data-placeholder");
		$(this).select2({
			dropdownParent: dropdownParents,
			placeholder: placehldrget,
		});
	});

	// --------mCustomScrollbar-------
	if ($('.scrollbar-custom').length) {
		$(".scrollbar-custom").mCustomScrollbar({
			theme:"minimal-dark",
			mouseWheelPixels: 300,
			scrollInertia: 300
		});
		//$(".chat-scrollbar").mCustomScrollbar("scrollTo", "bottom");
	}

	// --------date-picker-------
	if ($('#postdate').length) {
		$('#postdate').datepicker({
			format: "dd-mm-yyyy",
			orientation: "bottom right",
			templates :{
				leftArrow: '<i class="fa fa-chevron-left"></i>',
				rightArrow: '<i class="fa fa-chevron-right"></i>'
			}
		});
	}

	// --------------add active class-on another-page move----------
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('.account-sidebar ul li a[href="'+path+'"]');
	// Add active class to target2 link
	target.parent().addClass('active');

	$("#imgInp").on('change',function() {
		readURL(this);
	});

	if ($('.c-review-slider').length) {
		$('.c-review-slider').owlCarousel({
			loop: false,
			margin: 30,
			nav: true,
			navText:['<i class="fas fa-arrow-left"></i>','<i class="fas fa-arrow-right"></i>'],
			dots: false,
			autoWidth: true,
			autoplay: false,
			autoplayTimeout: 5000,
			autoplayHoverPause: false,
			responsive: {
				0: {
					items:1,
					autoWidth: false,
					margin: 10,
				},
				480: {
					items:1,
					autoWidth: false,
					margin: 15,
				},
				576: {
					items:1,
					autoWidth: false,
					margin: 15,
				},
				992: {
					items: 2,
					autoWidth: false
				},
				1200: {
					items:3,
					autoWidth: false
				},
				1600: {
					items:4,
					autoWidth: false
				}
			}
		})
	};
});

$(window).on("load resize",function(){
		layoutSpace();
});
function layoutSpace(){
	var containerwidth = $(".container").innerWidth();
	var windowWidth = $(window).innerWidth();	
	var remainningWidth = (windowWidth - containerwidth) / 2;
	$(".className").css("padding-left", remainningWidth + 'px');
}

function headerStuck(){
	var headerHeight = jQuery('.header-wrapper');
	var scroll = jQuery(window).scrollTop();
	if (scroll >= 50){
			headerHeight.addClass('header-sticky');
	}else{
		headerHeight.removeClass('header-sticky');
	}

	$(window).scroll(function(){
		var headerHeight = $('.header-wrapper');
		var scroll = $(window).scrollTop();
		if (scroll >= 50){
			headerHeight.addClass('header-sticky');
		}else{
			headerHeight.removeClass('header-sticky');
		}
	});
}

function Swiperslider(){
	var propertyswiper = new Swiper('.Swiperslider', {
		slidesPerView: 3,
	    spaceBetween: 10,
	    noSwiping: false,
	    simulateTouch:false,
		navigation: {
	        nextEl: '.swiper-slider-next',
	        prevEl: '.swiper-slider-prev',
	    },
	    scrollbar: {
	        el: '.swiper-scrollbar',
	        draggable: true,
	    },
	    breakpoints: {
	    	767: {
	          slidesPerView: 1,
	        },
	        1199: {
	          slidesPerView: 2,
	        },
	      }
	});
}

// ----------profile-image-update---------
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		
		reader.onload = function(e) {
			$('#imgpreviewPrf').attr('src', e.target.result);
		}
		
		reader.readAsDataURL(input.files[0]); // convert to base64 string
	}
}

function equalize(sel){
	var els = Array.prototype.slice.call(document.querySelectorAll(sel));  
	var row = [];
	var max;
	var top;
	  function setHeights() {
		row.forEach(function(e) {
		  e.style.height = max + 'px';
		});
	  }
	
	  for(var i=0; i < els.length; i++) {
		var el = els[i];
		el.style.height = 'auto';
		if (el.offsetTop !== top){     
		  setHeights();
		  top = el.offsetTop;      
		  max = 0;
		  row = [];
		}
		row.push(el);
		max = Math.max(max, el.offsetHeight);
	  }
	  setHeights(); 
	}
	window.onload = window.onresize = function() {
	  equalize('.c-review-slider .c-review-item');
	  equalize('.pf-categoy-row > .col-md-12 .eat-box');
	  
};
function isMobile() {//for detect mobile browser
   var appsVersion = navigator.appVersion,
	   isAndroid = (/android/gi).test(appsVersion),
	   isIOS = (/iphone|ipad|ipod/gi).test(appsVersion);
   return (isAndroid || isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
}