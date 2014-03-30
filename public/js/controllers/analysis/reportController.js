(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/analysis/moduleLoader',
		'text!templates/analysis/reportWorkspace.html',
		'text!templates/analysis/filters.html',
		'constants',
		'messages/analysis'
	], function (libs, utils, BaseView, ModuleLoader, reportWorkspaceTemplate, filtersTemplate, constants, messages) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Notification = utils.Notification,
			Vent = utils.Vent,
			CssClasses = utils.CssClasses,
			ReportController,

		setReportconfig = function (reportType) {
			var that = this;

			that.reportConfig = (_.filter(that.reportsFactory, function (report) {
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

			that.reportModules.html(jModules);
		},	

		renderFilters = function () {
			var that = this,
				filters = that.reportConfig.filters || {};

			if(filters) {
				that.reportFilters.html(that.filtersTemplate({
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

			Notification.info(messages.loadingReport);

			that.reportFilters.empty();
			that.reportModules.empty();

			if(!reportType) {
				reportType = (that.reportsFactory[0] || {}).key;
			}

			setReportconfig.call(that, reportType);

			renderFilters.call(that, reportType);
			renderModules.call(that, reportType);

			postReportLoad.call(that);
		},

		postReportLoad = function () {
			var that = this;

			Notification.hide();

			that.$('.prog-select').select2();

			that.jAccountsFilter = that.$('.flt-accounts');

			that.jAccountsFilter.on('change', function () {
				applyFilters.call(that);
			});
		},

		postRender = function () {
			var that = this;

			that.reportFilters = that.$('.report-filters');
			that.reportModules = that.$('.report-modules');

			Vent.trigger('analysis:reportSkeletonLoaded');	
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
					reportsFactory = that.bootstrap.reports,
					modules, jModules;

				
				that.$el.html(that.template());

				that.reportsFactory = reportsFactory;

				postRender.call(that);

				return that;	
			}

		});

		return ReportController;

	});
})();