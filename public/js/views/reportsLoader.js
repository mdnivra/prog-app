(function () {
	'use strict';

	define([
		'libs',
		'utils',
    'models/analysis/reportBootstrap',
		'controllers/analysis/reportController',
		'views/baseView',
		'views/analysis/reportsSidebar',
    'messages/analysis'
	], function (libs, utils, ReportBootstrapModel, ReportController, BaseView, ReportsSidebar, messages) {

		var $ = libs.jquery,
        Notification = utils.Notification,
        Vent = utils.Vent,

    fetchBootstrapData = function () {
      var that = this,
          deferred =  $.Deferred(),
          reportBootstrapModel = new ReportBootstrapModel();

      reportBootstrapModel.fetch({
          success: function (response) {
              deferred.resolve(response);
          },
          error: function () {
              deferred.reject();
          }
      });

      return deferred.promise();

    },

    loadReport = function () {
      var that = this,
          reportsWorkspace;

      Notification.info(messages.loadingReport);
      fetchBootstrapData.call(that)
      .done(function(bootstrap) {
          reportsWorkspace = new ReportController({
          bootstrap: bootstrap
        });
        reportsWorkspace.render();
      })
      .fail(function () {
        Notification.error(messages.serverError);
      });
    };

		return BaseView.extend({
			initialize: function (options) {
          var that = this;
          
          BaseView.prototype.initialize.call(that, options);

          that.listenTo(Vent, 'analysis:sidebarLoaded', function () {
            loadReport.call(that);
          });

          that.render();
      },

      render: function () {
          var that = this,
          	reportsSidebar;
                  
          Notification.info('Loading');

         reportsSidebar = new ReportsSidebar();
         reportsSidebar.render();
      }
		});

	});

})();