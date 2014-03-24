(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'text!templates/compInsights/competitorProfile.html'
		], function (libs, utils, BaseView, CompetitorProfileTemplate) {

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

				template: _.template(CompetitorProfileTemplate),

				initialize: function (options) {
					var that = this;

					BaseView.prototype.initialize.call(that, options);
					that.listenTo(that.model, 'change', that.render);
					that.listenTo(that.model, 'remove', that.destroy);
				},

				render: function () {
					var that = this;
					
					that.$el.html(that.template(that.model.toJSON()));

					postRender.call(that);
						
					return that;
				},

				destroy: function () {
					var that = this;

					that.remove();
				}
			});

			return socialAppView;	
	});
})();