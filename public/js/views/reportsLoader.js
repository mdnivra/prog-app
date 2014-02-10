(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'controllers/analysis/reportController',
		'views/baseView',
	], function (libs, utils, ReportController, BaseView) {

		var Notification = utils.Notification;

		return BaseView.extend({
			initialize: function (options) {
                var that = this;
                
                BaseView.prototype.initialize.call(that, options);
                that.render();
            },

            render: function () {
                var that = this;
                        
                Notification.info('Loading');

               new ReportController();
            }
		});

	});

})();