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

			renderAccount = function (account) {
				var that = this,
					accountView = new SingleAccountView({model: account});
					
				return accountView.render().el;
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
					var that = this,
						jAccounts = document.createDocumentFragment(),
						jContentBody;

					that.$el.html(that.template({
						messages: accountMessages,
						cssClasses: CssClasses
					}));

					jContentBody = that.jContentBody = that.$el.find('.content-body');
					that.jMsgBlock = jContentBody.find('.no-accounts');
					
					if(that.collection.length > 0) {
						jContentBody.empty();

						that.collection.each(function (account) {
							jAccounts.appendChild(renderAccount.call(that, account));
						});

						jContentBody.append(jAccounts);
					}

					return that;
				},

				addOne: function(account) {
					var that = this;

					that.jContentBody.append(renderAccount.call(that, account));
				} 
			});

			return accountListView;
		});
})();