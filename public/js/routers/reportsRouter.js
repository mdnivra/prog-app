(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'routers/baseRouter'
	], function (libs, utils, BaseRouter) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Vent = utils.Vent,
			ReportsRouter;

		ReportsRouter = BaseRouter.extend({

			routes: {
				'': 	'showReport',
				':id': 	'showReport'
			},

			showReport: function(id) {
				Vent.trigger('analysis:showReport', id);
				Vent.trigger('analysis:makeLinkActive', id);
			}
		});

		return ReportsRouter;

	});

})();