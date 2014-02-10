(function () {
	define([
		'libs',
		'utils',
		'views/baseView',
		'views/accounts/addSocialProfile',
		'constants'
	], function (libs, utils, BaseView, AddSocialProfile, Constants) {

		var _ = libs.underscore,
			$ = libs.jquery;

		var handleAction = function (e) {
			var that = this,
				jEl = $(e.currentTarget);

			switch(jEl.attr('data-action')) {
				case 'addSocialProfile':
					var addProfileView = new AddSocialProfile();
					$(addProfileView.render().el).appendTo(Constants.modalSelector);
					$(Constants.modalSelector).modal();
					break;
			}
		};

		return BaseView.extend({
			el : '#top-header',

			events : {
				'click [data-action]' : handleAction
			},

			initialize : function (options) {
				var that = this;

				BaseView.prototype.initialize.call(that, options);
			}

		});

	});
})();