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
					var that = this;

					that.$el.html(that.template({
						apps: that.collection,
						messages: messages,
						cssClasses: CssClasses
					}));

					that.jContentBody = that.$el.find('.content-body');
					that.jMsgBlock = that.jContentBody.find('.no-apps');
					if(that.collection.length > 0) {
						that.jContentBody.empty();
						that.collection.each(that.addOne, that);
					}
					return that;
				},

				addOne: function(app) {
					var that = this,
						appView = new SocialAppView({model: app});
					that.jMsgBlock.remove();
					that.jContentBody.append(appView.render().el);
				} 
			});

			return accountListView;
		});
})();