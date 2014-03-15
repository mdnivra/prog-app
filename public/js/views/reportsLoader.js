(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'controllers/analysis/reportController',
		'views/baseView',
		'views/analysis/reportsSidebar'
	], function (libs, utils, ReportController, BaseView, ReportsSidebar) {

		var Notification = utils.Notification,
        Vent = utils.Vent;

		return BaseView.extend({
			initialize: function (options) {
          var that = this,
              reportsWorkspace;
          
          BaseView.prototype.initialize.call(that, options);

          that.listenTo(Vent, 'analysis:sidebarLoaded', function () {
            reportsWorkspace = new ReportController();
            reportsWorkspace.render();
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