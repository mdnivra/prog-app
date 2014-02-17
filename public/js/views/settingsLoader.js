(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'controllers/settings/settingsController',
		'constants'
	], function (libs, utils, BaseView, SettingsController, constants) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification;

        return BaseView.extend({
        	initialize: function (options) {
        		var that = this;

        		BaseView.prototype.initialize.call(that, options);
        		that.render();
        	},

        	render : function () {
        		var that = this;

        		Notification.info('Loading...');
        		new SettingsController();

                return that;
        	}
        });
	});
})();

