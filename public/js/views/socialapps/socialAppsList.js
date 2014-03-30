(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'collections/socialapps/socialApps',
		'views/baseView',
		'views/socialapps/socialApp',
		'views/socialapps/addSocialApp',
		'text!templates/socialapps/socialAppsList.html',
		'messages/socialapps',
		'constants'
		], function (libs, utils, SocialAppsCollection, BaseView, SocialAppView, AddSocialAppView, SocialAppsListTemplate, messages, constants) {

			var _ = libs.underscore,
				$ = libs.jquery,
				Vent = utils.Vent,
				CssClasses = utils.CssClasses,

			handleAction = function (e) {
				var that = this,
					jEl = $(e.currentTarget);

				switch(jEl.attr('data-action')) {
					case 'addSocialApp': 
						openAddView.call(that);
						break;
				}
			},

			openAddView = function () {
				var that = this,
					addAppView = new AddSocialAppView({collection: that.collection});
					
				addAppView.render();
			},

			renderApp = function (app) {
				var that = this,
					appView = new SocialAppView({model: app});
					
				return appView.render().el;
			},

			accountListView = BaseView.extend({
				className: 'content-wrapper-inner ' + CssClasses['COLUMN-12'],
				
				events : {
					'click [data-action]' : handleAction
				},

				template: _.template(SocialAppsListTemplate),

				initialize: function (options) {
					var that = this;

					BaseView.prototype.initialize.call(that, options);
					that.listenTo(that.collection, 'add', that.addOne);
				},

				render: function () {
					var that = this,
						jApps = document.createDocumentFragment(),
						jContentBody;

					that.$el.html(that.template({
						messages: 	messages,
						cssClasses: CssClasses
					}));

					jContentBody = that.jContentBody = that.$el.find('.content-body');
					that.jMsgBlock = jContentBody.find('.no-apps');

					if(that.collection.length > 0) {
						jContentBody.empty();

						that.collection.each(function (app) {
							jApps.appendChild(renderApp.call(that, app));
						});

						jContentBody.append(jApps);
					}

					return that;
				},

				addOne: function(app) {
					var that = this;

					that.jContentBody.append(renderApp.call(that, app));
				} 
			});

			return accountListView;
		});
})();