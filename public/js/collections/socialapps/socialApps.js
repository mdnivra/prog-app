(function () {
	'use strict';

	define([
		'libs',
		'models/socialapps/socialApp',
		], function (libs, SocialAppModel) {

			var Backbone = libs.backbone;

			return Backbone.Collection.extend({
				url: 'social_app',
				
				model: SocialAppModel
			});
	});

})();