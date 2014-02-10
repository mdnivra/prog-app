(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'models/socialapps/socialApp',
		'text!templates/socialapps/socialApp.html'
		], function (libs, utils, BaseView, SocialAppModel, SocialAppTemplate) {

			var _ = libs.underscore,
				$ = libs.jquery,
				Notification = utils.Notification,
				CssClasses = utils.CssClasses,
	
			postRender = function () {
				var that = this;

				that.$('.prog-tooltip').tooltip({container: 'body'});
			},	

			socialAppView = BaseView.extend({
				className: 'pull-left '+ CssClasses['COLUMN-4'],

				template: _.template(SocialAppTemplate),

				initialize: function (options) {
					var that = this;

					BaseView.prototype.initialize.call(that, options);
					that.listenTo(that.model, 'change', that.render);
				},

				render: function () {
					var that = this;
					that.$el.html(that.template(that.model.toJSON()));
					postRender.call(that);
					return that;
				}
			});

			return socialAppView;	
	});
})();