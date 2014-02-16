(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView'
	], function (libs, utils, BaseView) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            BaseChartView;

        BaseChartView = BaseView.extend({

        	initialize: function (options) {
        		var that = this;

        		BaseView.prototype.initialize.call(that, options);
        	}
        });

        return BaseChartView;
	});

})();