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
            Vent = utils.Vent,
            reportsSidebarView,

        handleAction = function (e) {
            var that = this,
                jEl = $(e.currentTarget);


            switch (jEl.attr('data-action')) {
                case 'showReport':
                    showReport.call(that, jEl);
                    break;
            }
        },

        showReport = function (jEl) {
            var that = this;

            that.jSidebarItems.removeClass('active');
            jEl.addClass('active');
            $(constants.contentBodySelector).attr('data-report', jEl.attr('data-report'));
            Vent.trigger('analysis:showReport');
        };

        reportsSidebarView = BaseView.extend({

        	el: constants.sidebarSelector,

        	template: _.template(reportsSidebarTemplate),

            events: {
                'click [data-action]': handleAction
            },

        	initialize: function () {
        		var that = this;

        		BaseView.prototype.initialize.call(that);
        	},

        	render: function () {
        		var that = this;

        		that.$el.html(that.template({
        			reports: reportsFactory
        		}));

                that.jSidebarItems = that.$('.sidebar-list-item');
        		return that;
        	}
        });

        return reportsSidebarView;
	});

})();