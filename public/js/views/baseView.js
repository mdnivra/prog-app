(function () {
	'use strict';
	
	define([
		'libs',
		'utils'
		], function (libs, utils) {

			var Backbone = libs.backbone,
			_ = libs.underscore,
			$ = libs.jquery;

			return Backbone.View.extend({
				Vent: utils.vent,

				initialize: function (options) {
					var that = this,
						model; 

					_.extend(that, options || {});	
				},

				render: $.noop

				
			});
	});
})();