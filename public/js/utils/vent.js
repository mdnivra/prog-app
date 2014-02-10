(function () {
	'use strict';
	
	define([
		'libs'
		],function(libs){

		var Backbone = libs.backbone,
			_ = libs.underscore;

		return _.extend({}, Backbone.Events);
	});

})();