(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'models/socialapps/socialApp',
		'views/modalView',
		'text!templates/socialapps/addSocialApp.html',
		'messages/socialapps'
	], function (libs, utils, SocialAppModel, ModalView, AddSocialAppTemplate, messages) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Notification = utils.Notification,
			addSocialAppView,

			postRender = function () {
				var that = this;

				that.jSaveButton = that.$('.save-btn');
				that.jSaveButton.button();
				that.jMessage = that.$('.alert');
			},

			handleAction = function (e) {
				var that = this,
					jEl = $(e.currentTarget);

				ModalView.prototype.handleAction.call(that, e);

				switch(jEl.attr('data-action')) {
					case 'save':
						that.jSaveButton.button('loading');
						addSocialApp.call(that);
						break;
				}
			},

			saveSocialApp = function (appDetails) {
				var that = this,
					app,
					formData = that.formData,
					appId = formData.appId,
					appSecret= formData.appSecret,
					socialAppModel,
					appData = {
						app_id: appId,
						app_secret: appSecret,
						network_type: 'Facebook',
						title: appDetails.name,
						thumbnail: appDetails.logo_url,
						link: appDetails.link,
						ref_id: 0,
						access_token: appId+ '|'+ appSecret
					};

				if(that.collection) {
					app = that.collection.findWhere({app_id: appId}); 

					if(app && app.id) {
						appData.id = app.id;
						socialAppModel = app;
						socialAppModel.url = socialAppModel.url + '/' + appData.id;
					} else {
						socialAppModel = new SocialAppModel();
					}
				}

				Notification.info(messages.savingApps);
				socialAppModel.save(appData, {
					success: function () {
						Notification.success(messages.appsSaved);
						that.collection.add(socialAppModel);
						ModalView.prototype.closeView.call(that);
					},
					error: function () {
						Notification.error(messages.serverError);
						that.jSaveButton.button('reset');
					}
				});
			},

			addSocialApp = function () {
				var that = this,
					appId = that.$('#app_id').val(),
					appSecret = that.$('#app_secret').val();

				if(!validateData.call(that, appId, appSecret)) {
					that.jSaveButton.button('reset');
					return;
				}

				that.formData = {
					appId: appId,
					appSecret: appSecret
				};	

				$.when(fetchAppDetails.call(that,appId)).then(saveSocialApp, function () {
					Notification.error(messages.errorFetchingDetails);
					that.jSaveButton.button('reset');
				});
			},

			validateData = function (appId, appSecret) {
				var that = this,
					jMessage = that.jMessage;

				if(appId === "" ) {
					jMessage.text(messages.appIdMissing).removeClass('hide');
					return false;
				}

				if(appSecret === "") {
					jMessage.text(messages.secretMissing).removeClass('hide');
					return false;	
				}

				jMessage.addClass('hide');
				return true;
			},

			fetchAppDetails = function (appId) {
				var that = this,
					deferred = $.Deferred();


				Notification.info(messages.fetchingDetails)
				FB.api('/' + appId, function (response) {
					if(response.error) {
						deferred.reject();
					} else {
						deferred.resolveWith(that, [response]);
					}
				});

				return deferred.promise();
			},

			addSocialAppView = ModalView.extend({
				events: {
					'click [data-action]': handleAction
				},

				template: _.template(AddSocialAppTemplate),

				initialize: function (options) {
					var that = this;
					$.extend(options, {hasTooltip: false});
					ModalView.prototype.initialize.call(that, options);
				},

				render: function () {
					var that = this;

					that.$el.html(that.template());
					ModalView.prototype.render.call(that);
					postRender.call(that);
					return that;
				}
			});

			return addSocialAppView;
	});
})();