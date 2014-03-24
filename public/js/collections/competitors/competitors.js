(function () {
	'use strict';

	define([
		'libs',
		'models/competitors/competitor',
		], function (libs, CompetitorModel) {

			var Backbone = libs.backbone;

			return Backbone.Collection.extend({
				url: 'competitor',
				baseUrl: 'competitor',
				model: CompetitorModel
			});
	});

})();