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
			SettingsRouter;

		SettingsRouter = BaseRouter.extend({
			routes: {
				'': 				'socialAccounts',
				'socialAccounts': 	'socialAccounts',
				'socialApps': 		'socialApps',
				'competitors': 		'competitors'
			},

			socialApps: function () {
				Vent.trigger('settings:socialApps');
			},

			socialAccounts: function () {
				Vent.trigger('settings:socialAccounts');
			},

			competitors: function () {
				Vent.trigger('settings:competitors');
			}
		});

		return SettingsRouter;
	});
})();