(function () {
    'use strict';

    define([
        'libs',
        'utils',
        'views/baseView',
        'views/accountsLoader',
        'views/socialappsLoader',
        'views/compInsightsLoader',
        'routers/settingsRouter',
        'constants'
    ], function (libs, utils, BaseView, SocialAccountsLoader, SocialAppsLoader, CompetitorsLoader, SettingsRouter, constants) {

        var Backbone = libs.backbone,
            _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            Vent = utils.Vent,
            SettingsController,

        handleAction = function (e) {
            var that = this,
                jEl = $(e.currentTarget);

            loadSettingsModule.call(that, jEl.attr('data-action'));
        },

        initRouterEvents = function () {
            var that = this,
                jEl = that.$el;


            that.listenTo(Vent, 'settings:socialApps', function () {
                loadSettingsModule.call(that, 'loadSocialApps');
            });

            that.listenTo(Vent, 'settings:socialAccounts', function () {
                loadSettingsModule.call(that, 'loadSocialAccounts');
            });

            that.listenTo(Vent, 'settings:competitors', function () {
                loadSettingsModule.call(that, 'loadCompetitors');
            });
        },

        loadSettingsModule = function (action) {
            var that = this;

            that.jSidebarItems.removeClass('active');
            switch (action) {
                case 'loadSocialApps':
                    that.$('[data-action="loadSocialApps"]').addClass('active');
                    new SocialAppsLoader();
                    break;

                case 'loadSocialAccounts': 
                    that.$('[data-action="loadSocialAccounts"]').addClass('active');
                    new SocialAccountsLoader();
                    break;

                case 'loadCompetitors':
                    that.$('[data-action="loadCompetitors"]').addClass('active');
                    new CompetitorsLoader();
                    break;
            }
        },

        SettingsController = BaseView.extend({

            el: $(constants.sidebarSelector),

            events: {
                'click [data-action]': handleAction
            },

            initialize: function (options) {
                var that = this;
                
                BaseView.prototype.initialize.call(that, options);

                that.render();
            },

            render: function () {
                var that = this;

                that.jSidebarItems = that.$('.sidebar-list-item');
                initRouterEvents.call(that);
                new SettingsRouter;
                Backbone.history.start();
            
                return that;
            }
        });

        return SettingsController;
    });

})();