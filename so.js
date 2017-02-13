// ==UserScript==
// @name StackTop
// @description A top bar with style.
// @namespace TravisJ
// @author TravisJ
// @license GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include http://meta.stackoverflow.com/*
// @include http://stackoverflow.com/*
// @include *.stackexchange.com/*

//jQuery injection
function $$(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script).parentNode.removeChild(script);
};

//fix the new topbar
$$(function($){
	//no review
	$('.-link.js-review-button').parent().remove();
	
	//no jobs
	$('#nav-jobs').parent().remove();
	
	//no beta
	$('small.beta-badge').remove();
	
	//docs
	$('#nav-docs').text('Docs');
	
	//mah name
	var icon = $("a.my-profile.js-gps-track div.gravatar-wrapper-24");
	var name = icon[0].title;
	$('<span style="font-size:14px;padding:0 10px;">').text(name).insertBefore(icon);
});

//Hover TopBar Icons
$$(function($){
 $('.secondary-nav a.-link').each(function(){this.removeAttribute("title");});
 var btns = [];
 var achieve = { btn: 'a.-link.js-achievements-button', mod: '.topbar-dialog.achievements-dialog.dno' };
 btns.push(achieve);
 var inbox = { btn: 'a.-link.js-inbox-button', mod: '.topbar-dialog.inbox-dialog.dno' };
 btns.push(inbox);
 var se = { btn: 'a.-link.js-site-switcher-button.js-gps-track', mod: '.topbar-dialog.siteSwitcher-dialog.dno' };
 btns.push(se);
 for( var ind in btns ){
  var tar = btns[ind].btn;
  var mod = btns[ind].mod;
  var $ach = $(tar);
  (function($ach,mod){
   var d = StackExchange.helpers.DelayedReaction(function () {
    if( $(mod).is(':visible') )return;
    $ach.click();
    }, 450, { always: function () {
    j.cancel() }
   });
   var j = StackExchange.helpers.DelayedReaction(function () {
    if( !$(mod).is(':visible') )return;
    $ach.click();
    }, 1E3, { always: function () {
    d.cancel() }
   });
   var a = StackExchange.helpers.DelayedReaction(function () {
    }, 450, { always: function () {
    j.cancel(); d.cancel(); }
   });
   var b = StackExchange.helpers.DelayedReaction(function () {
    if( !$(mod).is(':visible') )return;
    $ach.click();
    }, 450, { always: function () {
    j.cancel(); a.cancel(); }
   });
   $ach.mouseenter(d.trigger);
   $ach.mouseleave(j.trigger);
   $ach.click(function(){
    a.cancel();
    d.cancel();
   });
   $('body').on('mouseenter',mod,a.trigger);
   $('body').on('mouseleave',mod,b.trigger);
  })($ach,mod)
 }
 
});

