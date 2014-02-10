(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/compInsights/compInsights',
		'constants'
	], function (libs, utils, BaseView, CompetitorInsightsView, constants) {

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
        		var competitorInsightsView = new CompetitorInsightsView();

        		$(constants.contentBodySelector).html(competitorInsightsView.render().el);
        	}
        });
	});
})();

