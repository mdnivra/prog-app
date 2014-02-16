(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'models/analysis/moduleData',
		'views/baseView',
		'factory/analysis/modules',
		'factory/analysis/chartViews',
		'parser/dataParser',
		'text!templates/analysis/module.html'
	], function (libs, utils, ModuleDataModel, BaseView, modulesFactory, chartViewsFactory, dataParser, moduleTemplate) {

		var $ = libs.jquery,
			_ = libs.underscore,
			ModuleLoader;

		ModuleLoader = BaseView.extend({

			tagName: 'article',

			className: 'rm-container rm-half-width pull-left',

			template: _.template(moduleTemplate),

			initialize: function (options) {
				var that = this;

				that.deferred = new $.Deferred();

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
				
				that.getData();
				$.when(that.deferred).done(function (data) {
					that.$('.rm-chart').html(new chartView({width: that.$el.width()}).render().el);
				});
				
				return that;
			},

			getData: function () {
				var that = this,
					deferred = that.deferred,
					dataModel = new ModuleDataModel();

				dataModel.fetch({
					success: function (data) {
						return deferred.resolve(dataParser.parseData(data.toJSON()));
					},

					error: function () {
						return deferred.resolve({error: 'Error'});	
					}
				});	
			}
		});

		return ModuleLoader;

	});
})();