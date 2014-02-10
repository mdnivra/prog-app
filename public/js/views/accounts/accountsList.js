(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'collections/accounts/socialAccounts',
		'views/baseView',
		'views/accounts/singleAccount',
		'views/accounts/addSocialProfile',
		'text!templates/accounts/accountList.html',
		'messages/accounts',
		'constants'
		], function (libs, utils, SocialAccountsCollection, BaseView, SingleAccountView, AddSocialProfileView, AccountListTemplate, accountMessages, constants) {

			var _ = libs.underscore,
				$ = libs.jquery,
				Vent = utils.Vent,
				CssClasses = utils.CssClasses,

			handleAction = function (e) {
				var that = this,
					jEl = $(e.currentTarget);

				switch(jEl.attr('data-action')) {
					case 'addSocialProfile': 
						openAddView.call(that);
						break;
				}
			},

			openAddView = function () {
				var that = this,
					addProfileView = new AddSocialProfileView({collection: that.collection});

				addProfileView.render();
			},

			accountListView = BaseView.extend({
				className: 'content-wrapper-inner ' + CssClasses['COLUMN-12'],
				
				events : {
					'click [data-action]' : handleAction
				},

				template: _.template(AccountListTemplate),

				initialize: function (options) {
					var that = this;

					BaseView.prototype.initialize.call(that, options);
					that.listenTo(that.collection, 'add', that.addOne);
				},

				render: function () {
					var that = this;

					that.$el.html(that.template({
						accounts: that.collection,
						messages: accountMessages,
						cssClasses: CssClasses
					}));

					that.jContentBody = that.$el.find('.content-body');
					that.jMsgBlock = that.jContentBody.find('.no-accounts');
					if(that.collection.length > 0) {
						that.jContentBody.empty();
						that.collection.each(that.addOne, that);
					}
					return that;
				},

				addOne: function(account) {
					var that = this,
						accountView = new SingleAccountView({model: account});
					that.jMsgBlock.remove();
					that.jContentBody.append(accountView.render().el);
				} 
			});

			return accountListView;
		});
})();