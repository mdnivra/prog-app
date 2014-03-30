(function () {
	'use strict';

	define([
		'libs',
		'utils',
        'routers/reportsRouter',
        'models/analysis/reportBootstrap',
		'controllers/analysis/reportController',
		'views/baseView',
		'views/analysis/reportsSidebar',
        'messages/analysis'
	], function (libs, utils, ReportsRouter, ReportBootstrapModel, ReportController, BaseView, ReportsSidebar, messages) {

		var $ = libs.jquery,
        Notification = utils.Notification,
        Vent = utils.Vent,

        fetchBootstrapData = function () {
            var that = this,
                deferred =  that.bootstrapDeferred,
                reportBootstrapModel = new ReportBootstrapModel();

            reportBootstrapModel.fetch({
                success: function (response) {
                    that.bootstrap = response;
                    deferred.resolve();
                },
                error: function () {
                    deferred.reject();
                }
            });

            return deferred.promise();
        },

        loadSidebar = function () {
            var that = this,
            reportsSidebar = new ReportsSidebar({
                reportsFactory: (that.bootstrap.toJSON().reports)
            });

            reportsSidebar.render();
        },

        loadReportSkeleton = function () {
            var that = this,
            reportsWorkspace = new ReportController({
                bootstrap: that.bootstrap.toJSON()
            });

            reportsWorkspace.render();
        };

        return BaseView.extend({
            initialize: function (options) {
                var that = this,
                    sidebarDeferred,
                    reportDeferred;
      
                BaseView.prototype.initialize.call(that, options);

                that.bootstrapDeferred = $.Deferred();
                sidebarDeferred = that.sidebarDeferred = $.Deferred();
                reportDeferred = that.reportDeferred = $.Deferred();

                that.listenTo(Vent, 'analysis:sidebarLoaded', function () {
                    sidebarDeferred.resolve();
                });

                that.listenTo(Vent, 'analysis:reportSkeletonLoaded', function () {
                    reportDeferred.resolve();
                });

                that.render();
            },

            render: function () {
                var that = this,
                	reportsSidebar;
                      
                Notification.info(messages.loadingReport);

                fetchBootstrapData.call(that);

                $.when(that.bootstrapDeferred)
                    .done(function() {
                        loadSidebar.call(that);
                        loadReportSkeleton.call(that);
                    })
                    .fail(function () {
                        Notification.error(messages.serverError);
                    });   

                $.when(that.sidebarDeferred, that.reportDeferred)
                    .done(function () {
                        new ReportsRouter;
                        Backbone.history.start();    
                    });
            }
		});

	});

})();