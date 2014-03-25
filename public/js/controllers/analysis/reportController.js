(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/analysis/moduleLoader',
		'factory/analysis/reports',
		'text!templates/analysis/reportWorkspace.html',
		'text!templates/analysis/filters.html',
		'constants'
	], function (libs, utils, BaseView, ModuleLoader, reportsFactory, reportWorkspaceTemplate, filtersTemplate, constants) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Notification = utils.Notification,
			Vent = utils.Vent,
			CssClasses = utils.CssClasses,
			ReportController,

		setReportconfig = function (reportType) {
			var that = this;

			that.reportConfig = (_.filter(reportsFactory, function (report) {
				return report.key === reportType;
			})[0] || {});
		},

		renderModules = function (reportType) {
			var that = this,
				jModules = document.createDocumentFragment(),
				modules;

			modules = that.reportConfig.modules;

			_.forEach(modules , function (module) {
				var moduleView = new ModuleLoader({module: module});
				that.moduleViews.push(moduleView);
				
				jModules.appendChild(moduleView.render().el);
			});

			that.$('.report-modules').html(jModules);
		},	

		renderFilters = function () {
			var that = this,
				filters = that.reportConfig.filters || {};

			if(filters) {
				that.$('.report-filters').html(that.filtersTemplate({
					filters: filters,
					cssClasses: CssClasses,
				}));
			}
		},

		applyFilters = function () {
			var that = this;

			that.jAccountsFilter.select2("val");
		},

		showReport = function (reportType) {
			var that = this;

			that.render(reportType);
		},

		postRender = function () {
			var that = this;

			that.$('.prog-select').select2();

			that.jAccountsFilter = that.$('.flt-accounts');

			that.jAccountsFilter.on('change', function () {
				applyFilters.call(that);
			});
		};
 
		ReportController = BaseView.extend({

			el: $(constants.contentBodySelector),

			template: _.template(reportWorkspaceTemplate),

			filtersTemplate: _.template(filtersTemplate),

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

				setReportconfig.call(that, reportType);
				
				that.$el.html(that.template());

				renderFilters.call(that, reportType);
				renderModules.call(that, reportType);

				postRender.call(that);

				Notification.hide();

				return that;	
			}

		});

		return ReportController;

	});
})();