(function () {
	'use strict';

	define([
		'factory/analysis/visualizations'
	], function (viz) {
		return {
			FACEBOOK_COMPETITOR_ANALYSIS: {
				availableVisualization: [viz.BAR, viz.COLUMN, viz.PIE]
			},

			TWITTER_COMPETITOR_ANALYSIS: {
				availableVisualization: [viz.LINE, viz.COLUMN, viz.PIE]
			},
		}
	});
})();