(function () {
	'use strict';

	define([], function () {
		return [
			{
				title: 'Competitor Analysis',
				key: 'COMPETITOR_ANALYSIS',
				modules : [
					{
						key: 	'FACEBOOK_COMPETITOR_ANALYSIS',
						title: 	'Facebook Competitors',
						width: 	'HALF_WIDTH'
					},

					{
						key: 	'TWITTER_COMPETITOR_ANALYSIS',
						title: 	'Twitter Competitors',
						width: 	'HALF_WIDTH'
					},
				]
			}
		];
	});
})();