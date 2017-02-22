// ==UserScript==
// @name StackTop
// @description A top bar with style.
// @namespace TravisJ
// @author TravisJ
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include http://meta.stackoverflow.com/*
// @include http://stackoverflow.com/*
// @include *.stackexchange.com/*

//main
(function main() {
	var $ = document.querySelector.bind(document);
	var observer = new MutationObserver(function(mutations) {
	  if($("#search .btn.js-search-submit")){
		observer.disconnect();
		
		//no review
		var review = $('.-link.js-review-button');
		review.parentNode.removeChild(review);
		
		//no jobs
		var jobs = $('#nav-jobs');
		jobs.parentNode.removeChild(jobs);
		
		//no beta
		var beta = $('small.beta-badge');
		beta.parentNode.removeChild(beta);
		
		//docs
		$('#nav-docs').textContent = 'Docs';
		
		//mah name
		var icon = $("a.my-profile.js-gps-track div.gravatar-wrapper-24");
		var name = icon.title;
		var span = document.createElement("span");
		span.style = "font-size:14px;padding:0 10px;";
		span.textContent = name;
		icon.parentNode.insertBefore(span,icon);
	  }
	});
	 	
	var config = { attributes: false, childList: true, characterData: false };
	observer.observe(document.documentElement, config);
})();



