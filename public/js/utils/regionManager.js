(function () {
	'use strict';

	define([
		'libs'
	], function (libs) {

		var Backbone = libs.backbone,
			$ = libs.jquery,
			_ = libs.underscore,
			instance,
			regionManager;

		function init () {
			var that = this;

			that.regions = {};

			return {
				showView: function (regionSelector, view) {
					var that = this,
						currentView = that.regions[regionSelector];

					if(currentView) {
						currentView.onClose();
					}

					currentView = that.regions[regionSelector] = view;
					$(regionSelector).html(currentView.render().el);

					return currentView;
				}
			};
		}

		return {
			getInstance : function () {
				if ( !instance ) {
		       		instance = init();
		      	}
		      	return instance;
			}
		};

	});

})();