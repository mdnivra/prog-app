(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'models/socialapps/socialApp',
		'collections/socialapps/socialApps',
		'views/modalView',
		'text!templates/socialapps/addPageTabs.html',
		'text!templates/socialapps/addAppSecretTemplate.html',
		'messages/socialapps',
		'constants'
	], function (libs, utils, SocialAppModel, SocialAppsCollection, ModalView, AddPageTabsTemplate, AddAppSecretTemplate, messages, constants) {

		var _ = libs.underscore,
			$ = libs.jquery,
			Notification = utils.Notification,
			Vent = utils.Vent,
			addSocialTabsView,
			CssClasses = utils.CssClasses,

		handleAction = function (e) {
			var that = this,
				jEl = $(e.currentTarget);
			
			switch(jEl.attr('data-action')) {
				case 'selectTab':
					selectTab.call(that, jEl);
					break;
				case 'removeTab': 
					removeTab.call(that, jEl);
					break;
				case 'next':
					showAddSecretView.call(that);
					break;
				case 'prev':
					hideAddSecretView.call(that);
					break;
				case 'save':
					saveTabs.call(that);
					break;
			}

			ModalView.prototype.handleAction.call(that, e);
		},

		closeView = function () {
			var that = this;

			ModalView.prototype.closeView.call(that);
		},

		toggleViews = function () {
			var that = this;
			
			that.jSaveBtn.toggle();
			that.jNextBtn.toggle();
			that.jPrevBtn.toggle();
			that.jTabsSelection.toggle();
			that.jAddedTabs.toggle();
			that.jAddSecret.toggle();
		},

		showAddSecretView = function () {
			var that = this,
				selectedTabsDetails = [];

			if(that.selectedTabs.length === 0) {
				Notification.error(messages.noAppSelected);
				return;
			}
			_.each(that.selectedTabs, function (id) {
				selectedTabsDetails.push(that.pageTabsDetails[id]);
			});

			that.jAddSecret.html(that.addSecretTemplate({
				tabs: selectedTabsDetails
			}));

			toggleViews.call(that);
		},

		hideAddSecretView = function () {
			var that = this;

			toggleViews.call(that);
		}, 

		removeTab = function (jEl) {
			var that = this,
				tab = that.collection.findWhere({'app_id': jEl.attr('data-appId')});

			if(tab) {
				Notification.info(messages.deletingApp);
				tab.destroy({
					url: that.collection.url + '/' + tab.get('id'),
					success: function () {
						Notification.success(messages.appDeleted);
						jEl.parents('.app-block').remove(); 
						if(that.collection.length === 0) {
							that.jAddedTabs.remove();
						}
					}, 
					error: function () {
						Notification.error(messages.errorInDeleting);
					}	
				});
			}
		},

		saveTabs = function () {
			var that = this,
				socialAppModel,
				appDetails,
				appSecret;

			that.jSaveBtn.button('loading');

			_.each(that.selectedTabs, function (id) {
				appDetails = that.pageTabsDetails[id];
				appSecret = $('#app_secret_' + id).val();

				socialAppModel = new SocialAppModel({
					app_id: id,
					app_secret: appSecret,
					network_type: 'Facebook',
					title: appDetails.application.name,
					thumbnail: appDetails.image_url,
					link: appDetails.link,
					ref_id: that.pageId,
					access_token: id+ '|'+ appSecret
				});
				that.collection.add(socialAppModel);
			});

			$.when(createTabs.call(that)).then(function () {
				closeView.call(that);
			});
		},

		createTabs = function () {
			var that = this,
				collection = that.collection,
				deferred = $.Deferred();
			
			
			if(collection.length === 0) {
				deferred.resolve();
			} else {
				Backbone.sync("create", collection, {
					success: function (response) {
						Notification.success(messages.appsSaved);
						deferred.resolve();
					},
					error: function (response) {
						Notification.error(messages.serverError);
						that.jSaveBtn.button('reset');
						deferred.reject();
					}
				});
			}

			return deferred.promise();
		},

		selectTab = function (jEl) {
			var that = this,
				index,
				newTitle,
				appId = jEl.attr('data-appId');

			if(jEl.hasClass('selected')) {
				jEl.removeClass('selected');
				newTitle = messages.clickToSelect;
				index = that.selectedTabs.indexOf(appId);
				if (index > -1) {
				    that.selectedTabs.splice(index, 1);
				}
			} else {
				jEl.addClass('selected');
				newTitle = messages.clickToDeselect;
				that.selectedTabs.push(appId);
			}

			jEl.tooltip('hide')
				.attr('data-original-title', newTitle)
				.tooltip('fixTitle')
				.tooltip('show');
		},

		fetchPageApps = function () {
			var that = this,
				deffered = $.Deferred(),
				tabs = [];

			Notification.info(messages.fetchingTabs);
			FB.api(that.pageId + '/tabs?limit=1000', function (response) { 
				if(response.error) {
					deffered.reject();
				} else {
					_.each(response.data, function (tab) {
						if(tab.application) {
							that.pageTabsDetails[tab.application.id] = tab;
							tabs.push(tab);
						}
					}); 
					that.pageTabs = tabs;
					deffered.resolveWith(that);
				}
			});

			return deffered.promise();
		},

		fetchAddedApps = function () {
			var that = this,
				deferred = $.Deferred();

			that.collection.fetch({ 
				url: that.collection.url + '/search',
				data: $.param({ ref_id: that.pageId}),
				success: function (response) {
					deferred.resolve();
				},
				error: function (response) {
					deferred.reject();
				}
			});

			return deferred.promise();
		},

		postRender = function () {
			var that = this,
				$el = that.$el;
				
			that.jSaveBtn = $el.find('.save-btn');
			that.jPrevBtn = $el.find('.prev-btn');
			that.jNextBtn = $el.find('.next-btn');
			that.jAddedTabs = $el.find('.added-tabs');
			that.jTabsSelection = $el.find('.tabs-selection');
			that.jAddSecret = $el.find('.add-secret');
			Notification.hide();
		},

		addSocialTabsView = ModalView.extend({
			events: {
				'click [data-action]': handleAction
			},

			template: _.template(AddPageTabsTemplate),

			addSecretTemplate: _.template(AddAppSecretTemplate),

			initialize: function (options) {
				var that = this;

				$.extend(options, {hasTooltip: true});

				ModalView.prototype.initialize.call(that, options);
				that.collection = new SocialAppsCollection();
				that.selectedTabs = [];
				that.pageTabsDetails = [];
				$.when(fetchPageApps.call(that), fetchAddedApps.call(that))
				.done(
					function () { 
						that.render() 
					}
				).fail(
					function() {
						Notification.error(messages.errorFetchingApps);
					}
				);
			},

			render: function () {
				var that = this;

				that.$el.html(that.template({
					addedTabs: that.collection,
					tabs: that.pageTabs,
					messages: messages,
					cssClasses: CssClasses
				}));
			
				ModalView.prototype.render.call(that);
				postRender.call(that);
			}
		});

		return addSocialTabsView;
	});

})();