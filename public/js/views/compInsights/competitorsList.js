(function () {
	'use strict';

	define([
		'libs',
		'utils',
        'collections/competitors/competitors',
		'views/baseView',
        'views/compInsights/manageCompetitors',
        'views/compInsights/competitorProfile',
		'text!templates/compInsights/competitorsList.html',
		'messages/compInsights'
	], function (libs, utils, CompetitorsCollection, BaseView, ManageCompetitorsView, CompetitorProfileView, CompetitorsListTemplate, messages) {

		var Backbone = libs.backbone,
			_ = libs.underscore,
            $ = libs.jquery,
            Vent = utils.Vent,
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
                case 'removeCompetitor':
                    removeCompetitor.call(that, jEl.parent().attr('data-id'));
                    break;
                default: 
        	}
        },

        removeCompetitor = function (id) {
            var that = this,
                collection = that.collection,
                competitorModel;

            competitorModel = collection.get(id);
            competitorModel.destroy({
                url: competitorModel.baseUrl + '/' + id,
                success: function () {
                    Notification.success(messages.removedSuccessfully);
                    collection.remove(id);
                }, 
                error: function () {
                    Notification.error(messages.serverError);
                }
            });
        },

        openManageCompetitorView = function () {
            var that = this,
            	network = that.network,
                manageCompetitorView;

            Notification.info(messages.fetchingCompetitors);

            $.when(fetchCompetitors.call(that)).done(
                function (competitors) {
                     manageCompetitorView = new ManageCompetitorsView({
                        network: network,
                        collection: competitors,
                        fullCollection: that.collection
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
            	collection,
                deferred = $.Deferred();

            
        	collection = new CompetitorsCollection();

            collection.fetch({
            	url: collection.baseUrl + '?network_type=' + that.network,

                success: function (response) {
                    deferred.resolve(response);
                },
                error: function () {
                    deferred.reject();
                }
            });
            

            return deferred.promise();
        },

        renderProfile = function(profile) {
			var that = this,
				profileView;

			profileView = new CompetitorProfileView({
				model: profile
			});
			
			return profileView.render().el;
		},

        compInsightsView = BaseView.extend({
        	className: 'content-wrapper-inner ' + CssClasses['COLUMN-12'] ,

        	events: {
        		'click [data-action]': handleAction
        	},

        	template: _.template(CompetitorsListTemplate),

        	initialize: function (options) {
        		var that = this;

        		BaseView.prototype.initialize.call(that, options);
        		that.listenTo(that.collection, 'add', that.renderNewProfile);
        		that.listenTo(that.collection, 'remove', that.removeProfile);
        		that.listenTo(Vent, 'competitors:saved', that.postSave);
        	},

        	render: function () {
				var that = this,
					jProfiles = document.createDocumentFragment();

				Notification.hide();

				that.$el.html(that.template({
					messages: messages,
					cssClasses: CssClasses
				}));

				that.jContentBody = that.$el.find('.content-body');
				that.jMsgBlock = that.jContentBody.find('.no-competitors');

				if(that.collection.length > 0) {
					that.jContentBody.empty();

					that.collection.each(function (profile) {
						jProfiles.appendChild(renderProfile.call(that, profile));
					});

					that.jContentBody.append(jProfiles);
				}
				return that;
			},

			renderNewProfile: function (profile) {
				var that = this;

				that.jContentBody.append(renderProfile.call(that, profile));
			},

			postSave: function () {
				var that = this;

				Backbone.sync('update', that.collection, {
                	url: that.collection.baseUrl + '/1'
                });
			}
        });

        return compInsightsView;
	});

})();

