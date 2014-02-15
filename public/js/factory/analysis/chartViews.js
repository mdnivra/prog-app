(function () {
	'use strict';

	define([
		'factory/analysis/visualizations',
		'views/charts/barChart',
		'views/charts/lineChart'
	], function (vis, BarChartView, LineChartView) {
	
		return {
			getChartView: function (visualization) {
				var chartView;
				if(!visualization) {
					return;
				}

				switch(visualization) {
					case vis.BAR:
						chartView = BarChartView;
						break;

					case vis.LINE:
						chartView = LineChartView;
						break;
				}

				return chartView;
			}
		};

	})
})();