(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'factory/analysis/modules',
		'factory/analysis/chartViews',
		'text!templates/analysis/module.html'
	], function (libs, utils, BaseView, modulesFactory, chartViewsFactory, moduleTemplate) {

		var _ = libs.underscore,
			ModuleLoader;

		ModuleLoader = BaseView.extend({

			tagName: 'article',

			className: 'rm-container rm-half-width pull-left',

			template: _.template(moduleTemplate),

			initialize: function (options) {
				var that = this;

				BaseView.prototype.initialize.call(that, options);
			},

			render: function () {
				var that = this,
					chartView,
					moduleDetails = that.module,
					moduleParams =  modulesFactory[moduleDetails.key],
					visualization = moduleParams.availableVisualization[0];

				chartView = chartViewsFactory.getChartView(visualization);
				
				that.$el.html(that.template({
					heading: moduleDetails.title,
				}));
				

				that.$('.rm-chart').html(new chartView().render().el);
				
				return that;
			}
		});

		return ModuleLoader;

	});
})();