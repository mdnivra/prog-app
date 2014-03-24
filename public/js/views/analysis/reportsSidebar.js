(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'factory/analysis/reports',
        'routers/reportsRouter',
		'text!templates/analysis/reportsSidebar.html',
		'constants'
	], function (libs, utils, BaseView, reportsFactory, ReportsRouter, reportsSidebarTemplate, constants) {

		var Backbone = libs.backbone,
            _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            Vent = utils.Vent,
            reportsSidebarView,

        initRouter = function () {
            var that = this;
            
            that.listenTo(Vent, 'analysis:makeLinkActive', makeLinkActive);

            new ReportsRouter;
            Backbone.history.start();
        },

        makeLinkActive = function (reportType) {
            var that = this,
                jEl;

            if(reportType) {
                jEl = that.$('[data-report="' + reportType + '"]'); 

                that.jSidebarItems.removeClass('active');
                jEl.addClass('active');
            }

        };

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

                that.jSidebarItems = that.$('.sidebar-list-item');

                Vent.trigger('analysis:sidebarLoaded');
                initRouter.call(that);
        		return that;
        	}
        });

        return reportsSidebarView;
	});

})();