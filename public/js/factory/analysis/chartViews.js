(function () {
	'use strict';

	define([
		'factory/analysis/visualizations',
		'views/charts/barChart'
	], function (vis, BarChartView) {
	
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
				}

				return chartView;
			}
		};

	})
})();