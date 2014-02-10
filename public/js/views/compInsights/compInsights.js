(function () {
	'use strict';

	define([
		'libs',
		'utils',
        'collections/competitors/competitors',
		'views/baseView',
        'views/compInsights/manageCompetitors',
		'text!templates/compInsights/compInsights.html',
		'messages/compInsights'
	], function (libs, utils, CompetitorsCollection, BaseView, ManageCompetitorsView, CompetitorInsightsTemplate, messages) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            CssClasses = utils.CssClasses,
            compInsightsView,

        handleAction = function (e) {
        	var that = this,
        		jEl = $(e.currentTarget);
            
        	switch(jEl.attr('data-action')) {
        		case 'manageFacebookCompetitors':
                    that.network = 'Facebook';
                    openManageCompetitorView.call(that);
        			break;
        		case 'manageTwitterCompetitors':
                    that.network = 'Twitter';
                    openManageCompetitorView.call(that);
        			break;
                default: 
        	}
        },

        openManageCompetitorView = function () {
            var that = this,
                manageCompetitorView;

            Notification.info(messages.fetchingCompetitors);
            $.when(fetchCompetitors.call(that)).done(
                function () {
                     manageCompetitorView = new ManageCompetitorsView({
                        network: that.network,
                        collection: that.collection
                    });

                    manageCompetitorView.render();
                }
            ).fail(
                function () {
                    Notification.error(messages.serverError);
                }
            );
        },

        fetchCompetitors = function () {
            var that = this,
                deferred = $.Deferred();

            that.collection = new CompetitorsCollection();

            that.collection.fetch({
                success: function (response) { console.log(response);
                    deferred.resolve();
                },
                error: function () {
                    deferred.reject();
                }
            });

            return deferred.promise();
        },

        compInsightsView = BaseView.extend({
        	className: 'content-wrapper-inner ' + CssClasses['COLUMN-12'] ,

        	events: {
        		'click [data-action]': handleAction
        	},

        	template: _.template(CompetitorInsightsTemplate),

        	initialize: function () {
        		var that = this;

        		BaseView.prototype.initialize.call(that);
        	},

        	render: function () {
        		var that = this;

        		Notification.hide();
        		that.$el.html(that.template({
        			messages: messages
        		}));

        		return that;
        	}
        });

        return compInsightsView;
	});

})();

