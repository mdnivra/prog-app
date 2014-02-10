(function () {
	'use strict';

	define([
		'libs',
		'models/accounts/socialUser'
		], function (libs, SocialUserModel) {

			var Backbone = libs.backbone;

			return Backbone.collection.extend({
				model : SocialUserModel
			});
	});
	
})();