'use strict';// Put your JS here
/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */(function($){// Use this variable to set up the common and page specific functions. If you
// rename this variable, you will also need to rename the namespace below.
var mirai={// All pages
'common':{init:function init(){$('body').fadeIn(1000);if($(window).width()<800){$('.footer-nav h3').click(function(e){e.preventDefault();$(this).toggleClass('active');$(this).siblings('nav').slideToggle();});}// Sticky Header
// var rafTimer;
// window.onscroll = function (event) {
//   cancelAnimationFrame(rafTimer);
//   rafTimer = requestAnimationFrame(toggleHeaderFloating);
// };
// function toggleHeaderFloating() {
//   // does cause layout/reflow: https://git.io/vQCMn
//   if (window.scrollY > 80) {
//     document.body.classList.add('sticky');
//   } else {
//     document.body.classList.remove('sticky');
//   }
// }
// Hide nav on link click 
$('.nav-mobile a').click(function(){$('body, .nav-mobile, .mobile-trigger span').toggleClass('mobile-menu-active');});// Smooth Scroll to links
$(document).on('click','a[href^="#"]',function(event){event.preventDefault();$('html, body').animate({scrollTop:$($.attr(this,'href')).offset().top},500);});// Reset nav on window resize
$(window).resize(function(){var width=$(document).width();if(width<900){$('body, .nav-mobile, .mobile-trigger span').removeClass('mobile-menu-active');}});$('.mobile-trigger').click(function(){$(this).find('span').toggleClass('mobile-menu-active');$('body, .nav-mobile').toggleClass('mobile-menu-active');});},finalize:function finalize(){// JavaScript to be fired on all pages, after page specific JS is fired
}}};// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL={fire:function fire(func,funcname,args){var fire;var namespace=mirai;funcname=funcname===undefined?'init':funcname;fire=func!=='';fire=fire&&namespace[func];fire=fire&&typeof namespace[func][funcname]==='function';if(fire){namespace[func][funcname](args);}},loadEvents:function loadEvents(){// Fire common init JS
UTIL.fire('common');// Fire page-specific init JS, and then finalize JS
$.each(document.body.className.replace(/-/g,'_').split(/\s+/),function(i,classnm){UTIL.fire(classnm);UTIL.fire(classnm,'finalize');});// Fire common finalize JS
UTIL.fire('common','finalize');}};// Load Events
$(document).ready(UTIL.loadEvents);})(jQuery);// Fully reference jQuery after this point.