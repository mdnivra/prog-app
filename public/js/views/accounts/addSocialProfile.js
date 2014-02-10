(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'collections/accounts/socialAccounts',
		'models/accounts/socialAccount',
		'models/accounts/socialUser',
		'views/modalView',
		'text!templates/accounts/addSocialProfileTemplate.html',
		'messages/accounts',
		'constants'
		], function (libs, utils, SocialAccountsCollection, SocialAccountModel, SocialUserModel, ModalView, AddSocialProfileTemplate, accountsMessages, constants){

			var Backbone = libs.backbone,
				_ = libs.underscore,
				$ = libs.jquery,
				Vent = utils.Vent,
				Notification = utils.Notification,
				addSocialProfileView,

			handleAction = function (e) {
				var that = this,
					jEl = $(e.currentTarget);

				ModalView.prototype.handleAction.call(that, e);

				switch (jEl.attr('data-action')) {
					case 'addFacebookAccount':
						addFacebookAccount.call(that);
						break;

					case 'addTwitterAccount': 
						addTwitterAccount.call(that);
						break;
				}	

			},

			closeView = function () {
				var that = this;

				ModalView.prototype.closeView.call(that);
			},

			addFacebookAccount = function () {
				var that = this,
					pagesDeferred;

				facebookAuth.call(that).done(function (response) {
					var fbId = response.authResponse.userID;

					fetchFacebookAccounts.call(that, fbId).done(function (accounts){
						if(accounts && accounts.data) {
							Notification.info(accountsMessages.savingPages);
							saveAccounts.call(that, accounts.data);
						} else {
							Notification.error(accountsMessages.noPages);
						}
					});

				}).fail(function () {
					Notification.error(accountsMessages.noPages);
				});
			},

			facebookAuth = function () {
				var that = this,
					user,
					authResponse,
					userModel,
					accountDeferred = $.Deferred();

				FB.login(function(response) {
					authResponse = response.authResponse
					if (authResponse) {
						Notification.info(accountsMessages.savingAccount);
						// save user
						FB.api('/me', function (data){
							user = {
								network_id: authResponse.userID,
								network_type: 'Facebook',
								access_token: authResponse.accessToken,
								fullname: data.name,
								email: data.email
							};
							
							userModel = new SocialUserModel();
							userModel.save(user, {
								success: function () {
									Notification.success(accountsMessages.accountSaved);
									accountDeferred.resolve(response);
								}, 
								error: function () {
									accountDeferred.reject();
									Notification.error(accountsMessages.serverError);
								}
							});
						});
						
					} else {
						accountDeferred.reject();
						Notification.error(accountsMessages.permissionDenied);					
					}

				}, {scope: 'manage_pages,email'});

				return accountDeferred.promise();
			},

			fetchFacebookAccounts = function (fbId) {
				var that = this,
					pagesDeferred = $.Deferred(),
					url = fbId  + '/accounts?limit=100';
				
				Notification.info(accountsMessages.fetchingPages);
				FB.api(url, function (accounts) {
					pagesDeferred.resolve(accounts);
				});

				return pagesDeferred.promise();
			},

			saveAccounts = function (accounts) {
				var that = this,
					accountData,
					toCreateCollection = new SocialAccountsCollection(),
					toUpdateCollection = new SocialAccountsCollection();

				_.each(accounts, function (value, key) {
					if(that.collection) {
						var account = that.collection.findWhere({object_id: value.id}); 
					}
					var socialAccount = new SocialAccountModel();
					accountData = {
						object_id: value.id,
						network_type: 'Facebook',
						title: value.name,
						username: value.username || "",
						thumbnail: "https://graph.facebook.com/" + value.id + "/picture?type=normal",
						email: value.email || "",
						access_token: value.access_token,
						state: "",
						country: ""
					};
					
					if(typeof account === "undefined") {
						socialAccount.set(accountData);
						toCreateCollection.add(socialAccount);
					} else {
						accountData.id = account.id;
						socialAccount.set(accountData);
						toUpdateCollection.add(socialAccount);
					}
				});

				$.when(createSocialAccounts.call(that,toCreateCollection), updateSocialAccounts.call(that, toUpdateCollection)).done(
					function () {
						Notification.success(accountsMessages.pagesSaved);
						closeView.call(that);	
					}
				).fail(
					function () {
						Notification.error(accountsMessages.serverError);
						closeView.call(that);
					}
				);
			},

			createSocialAccounts = function (collection) {
				var that = this,
					deferred = $.Deferred();
				
				
				if(collection.length === 0) {
					deferred.resolve();
				} else {
					Backbone.sync("create", collection, {
						success: function (response) {
							Notification.success(accountsMessages.pagesSaved);
							that.collection.add(collection.models);
							deferred.resolve();
						},
						error: function (response) {
							Notification.error(accountsMessages.serverError);
							deferred.reject();
						}
					});
				}

				return deferred.promise();
			},

			updateSocialAccounts = function (collection) {
				var that = this,
					deferred = $.Deferred();

				if(collection.length === 0) {
					deferred.resolve();
				} else {
					Backbone.sync("update", collection, {
						url : 'social_account/1',
						success: function (response) { 
							Notification.success(accountsMessages.pagesSaved);
							deferred.resolve();
						},
						error: function (response) {
							Notification.error(accountsMessages.serverError);
							deferred.reject();
						}
					});
				}				

				return deferred.promise();
			},

			addTwitterAccount = function () {
				var that = this,
					timer,
					socialAccount,
					twitterData,
					authWindow = window.open('twitteroauth', "twitterAuth", "width=800,height=600");

				window.closeAuth = function (data) { 
					twitterData = JSON.parse(data);
					socialAccount = new SocialAccountModel();
					socialAccount.set(twitterData);
					if(twitterData.isNew) {
						that.collection.add(socialAccount);
					}
					window.closeAuth = null;
					Notification.success(accountsMessages.accountSaved);
					closeView.call(that);
				}
			},

			addSocialProfileView = ModalView.extend({
				events: {
					'click [data-action]': handleAction
				},

				template: _.template(AddSocialProfileTemplate),

				initialize: function (options) {
					var that = this;

					$.extend(options, {hasTooltip: true});
					ModalView.prototype.initialize.call(that, options);	
				},

				render: function () {
					var that = this;

					that.$el.html(that.template());

					ModalView.prototype.render.call(that);
					return that;
				}
			});

			return addSocialProfileView;
	});

})();