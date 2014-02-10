(function () {
	'use strict';

	define([
		'libs',
		'models/accounts/socialAccount',
		], function (libs, SocialAccountModel) {

			var Backbone = libs.backbone;

			return Backbone.Collection.extend({
				url: 'social_account',
				
				model: SocialAccountModel
			});
	});

})();