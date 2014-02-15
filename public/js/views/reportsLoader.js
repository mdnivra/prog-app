(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'controllers/analysis/reportController',
		'views/baseView',
		'views/analysis/reportsSidebar'
	], function (libs, utils, ReportController, BaseView, ReportsSidebar) {

		var Notification = utils.Notification;

		return BaseView.extend({
			initialize: function (options) {
                var that = this;
                
                BaseView.prototype.initialize.call(that, options);
                that.render();
            },

            render: function () {
                var that = this,
                	reportsWorkspace,
                	reportsSidebar;
                        
                Notification.info('Loading');

               that.reportsWorkspace = reportsWorkspace = new ReportController();
               reportsWorkspace.render();

               reportsSidebar = new ReportsSidebar();
               reportsSidebar.render();
            }
		});

	});

})();