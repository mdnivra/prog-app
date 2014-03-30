(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'text!templates/analysis/reportsSidebar.html',
		'constants'
	], function (libs, utils, BaseView, reportsSidebarTemplate, constants) {

		var Backbone = libs.backbone,
            _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            Vent = utils.Vent,
            reportsSidebarView,

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

                that.listenTo(Vent, 'analysis:makeLinkActive', makeLinkActive);
        	},

        	render: function () {
        		var that = this;

        		that.$el.html(that.template({
        			reports: that.options.reportsFactory
        		}));

                that.jSidebarItems = that.$('.sidebar-list-item');

                Vent.trigger('analysis:sidebarLoaded');
               	
        		return that;
        	}
        });

        return reportsSidebarView;
	});

})();