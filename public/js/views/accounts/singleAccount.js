(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'models/accounts/socialAccount',
		'views/baseView',
		'views/socialapps/addSocialTabs',
		'text!templates/accounts/singleAccount.html',
		'messages/accounts'
		], function (libs, utils, SocialAccountModel, BaseView, AddPageTabsView, SingleAccountTemplate, accountsMessages) {

			var _ = libs.underscore,
				$ = libs.jquery,
				Notification = utils.Notification,
				CssClasses = utils.CssClasses,

			handleAction = function (e) {
				var that = this,
					jEl = $(e.currentTarget),
					pageId = jEl.parent().attr('data-object-id');

				switch(jEl.attr('data-action')) {
					case 'addPageTabs':
						new AddPageTabsView({
							pageId: pageId
						});
						break;
				}
			},

			postRender = function () {
				var that = this;

				that.$('.prog-tooltip').tooltip({container: 'body'});
			},	

			singleAccountView = BaseView.extend({
				className: 'pull-left ' + CssClasses['COLUMN-4'],

				template: _.template(SingleAccountTemplate),

				events : {
					'click [data-action]' : handleAction
				},

				initialize: function (options) {
					var that = this;

					BaseView.prototype.initialize.call(that, options);
				},

				render: function () {
					var that = this;
					that.$el.html(that.template(that.model.toJSON()));
					postRender.call(that);
					return that;
				}
			});

			return singleAccountView;	
	});
})();