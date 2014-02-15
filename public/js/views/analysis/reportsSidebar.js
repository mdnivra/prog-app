(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'factory/analysis/reports',
		'text!templates/analysis/reportsSidebarTemplate.html',
		'constants'
	], function (libs, utils, BaseView, reportsFactory, reportsSidebarTemplate, constants) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            reportsSidebarView;

        reportsSidebarView = BaseView.extend({

        	el: constants.sidebarSelector,

        	template: _.template(reportsSidebarTemplate),

        	initialize: function () {
        		var that = this;

        		BaseView.prototype.initialize.call(that);
        	},

        	render: function () {
        		var that = this;

        		that.$el.html(that.template({
        			reports: reportsFactory
        		}));

        		return that;
        	}
        });

        return reportsSidebarView;
	});

})();