(function () {
	'use strict';

	define([
		'libs',
		'utils',
        'collections/competitors/competitors',
		'views/baseView',
		'views/compInsights/competitorsList',
		'constants',
        'messages/compInsights'
	], function (libs, utils, CompetitorsCollection, BaseView, CompetitorsListView, constants, messages) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,

        fetchCompetitors = function () {
            var that = this,
                deferred = $.Deferred();

            that.collection = new CompetitorsCollection();

            that.collection.fetch({
                success: function (response) { 
                    deferred.resolve();
                },
                error: function () {
                    deferred.reject();
                }
            });

            return deferred.promise();
        };

        return BaseView.extend({
        	initialize: function (options) {
        		var that = this;

        		BaseView.prototype.initialize.call(that, options);
        		that.render();
        	},

        	render : function () {
        		var that = this,
                    competitorsListView;

        		Notification.info('Loading...');

                $.when(fetchCompetitors.call(that)).done(
                    function () {
                        competitorsListView = new CompetitorsListView({
                            collection: that.collection     
                        });
                        
                        $(constants.contentBodySelector).html(competitorsListView.render().el);
                    }
                ).fail(
                    function () {
                        Notification.error(messages.serverError);
                    }
                );
        	}
        });
	});
})();

