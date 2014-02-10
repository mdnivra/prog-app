(function () {
	'use strict';

	define([], function () {
		return [
			{
				title: 'Competitor Analysis',
				key: 'COMPETITOR_ANALYSIS',
				modules : {
					"FACEBOOK_COMPETITOR_ANALYSIS": {
						title: 'Facebook Competitors',
						width: 'HALF_WIDTH'
					},

					"TWITTER_COMPETITOR_ANALYSIS": {
						title: 'Twitter Competitors',
						width: 'HALF_WIDTH'
					},
				}
			}
		];
	});
})();