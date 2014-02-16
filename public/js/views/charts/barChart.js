(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseChartView',
		'views/charts/highchartsParams',
		'highcharts'
	], function (libs, utils, BaseChartView, chartDefaultParams) {

		var BarChartView;

		BarChartView = BaseChartView.extend({

			render: function () {
				var that = this,
					options = that.options;

				var data = {
			            xAxis: {
			                categories: ['Jan', 'Feb', 'Mar', 'Apr']
			            },
			            series: [{
			                name: 'Tokyo',
			                data: [7.0, 6.9, 9.5, 14.5]
			            }, {
			                name: 'New York',
			                data: [0.2, 0.8, 5.7, 11.3]
			            }, {
			                name: 'Berlin',
			                data: [0.9, 0.6, 3.5, 8.4]
			            }, {
			                name: 'London',
			                data: [3.9, 4.2, 5.7, 8.5]
			            }]
			        };
			   
				that.$el.highcharts(_.merge({
						chart: {
			                type: 'bar',
			                width: options.width
			            }
		        	},
					chartDefaultParams, data)
				);

				return that;
			}
 
		});

		return BarChartView;
	});
})();
