(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/analysis/moduleLoader',
		'factory/analysis/reports',
		'text!templates/analysis/reportWorkspace.html',
		'constants'
	], function (libs, utils, BaseView, ModuleLoader, reportsFactory, reportWorkspaceTemplate, constants) {

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

		renderModules = function (reportType) {
			var that = this,
				jModules = document.createDocumentFragment(),
				modules;

			modules = getModules.call(that, reportType);

			_.forEach(modules , function (module) {
				var moduleView = new ModuleLoader({module: module});
				that.moduleViews.push(moduleView);
				
				jModules.appendChild(moduleView.render().el);
			});

			that.$('.report-modules').html(jModules);
		},	

		showReport = function (reportType) {
			var that = this;

			that.render(reportType);
		};
 
		ReportController = BaseView.extend({

			el: $(constants.contentBodySelector),

			template: _.template(reportWorkspaceTemplate),

			initialize: function(options) {
				var that = this;

				BaseView.prototype.initialize.call(that, options);
				that.listenTo(Vent, 'analysis:showReport', showReport);
				that.moduleViews = [];
			},

			render: function (reportType) {
				var that = this,
					jEl = that.$el,
					modules, jModules;

				if(!reportType) {
					reportType = (reportsFactory[0] || {}).key;
				}
				
				that.$el.html(that.template());

				renderModules.call(that, reportType);

				Notification.hide();

				return that;	
			}

		});

		return ReportController;

	});
})();