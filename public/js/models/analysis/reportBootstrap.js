(function () {
	'use strict';
	
	define([
		'libs'
		],function(libs){

		var Backbone = libs.backbone;

		return Backbone.Model.extend({
			url: 'competitor'
		});
	});
})();