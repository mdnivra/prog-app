(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/analysis/moduleLoader',
		'factory/analysis/reports',
		'constants'
	], function (libs, utils, BaseView, ModuleLoader, reportsFactory, constants) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Notification = utils.Notification,
			Vent = utils.Vent,
			ReportController,

		getModules = function (reportType) {
			return (_.filter(reportsFactory, function (report) {
				return report.key === reportType;
			})[0] || {}).modules;
		},

		showReport = function (reportType) {
			var that = this;

			that.render(reportType);
		};
 
		ReportController = BaseView.extend({

			el: $(constants.contentBodySelector),

			initialize: function(options) {
				var that = this;

				BaseView.prototype.initialize.call(that, options);
				that.listenTo(Vent, 'analysis:showReport', showReport);
				that.moduleViews = [];
			},

			render: function (reportType) {
				var that = this,
					jEl = that.$el,
					modules, jModules = document.createDocumentFragment();

				if(!reportType) {
					reportType = (reportsFactory[0] || {}).key;
				}
				
				modules = getModules.call(that, reportType);

				_.forEach(modules , function (module) {
					var moduleView = new ModuleLoader({module: module});
					that.moduleViews.push(moduleView);
					
					jModules.appendChild(moduleView.render().el);
				});
				
				that.$el.html(jModules);

				Notification.hide();

				return that;	
			}

		});

		return ReportController;

	});
})();