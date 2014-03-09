(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'views/baseView',
		'views/accountsLoader',
		'views/socialappsLoader',
		'views/compInsightsLoader',
		'constants'
	], function (libs, utils, BaseView, SocialAccountsLoader, SocialAppsLoader, CompetitorsLoader, constants) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            SettingsController,

        handleAction = function (e) {
        	var that = this,
                jEl = $(e.currentTarget);

            that.jSidebarItems.removeClass('active');
            jEl.addClass('active');
            
            switch (jEl.attr('data-action')) {
                case 'loadSocialApps':
                   	new SocialAppsLoader();
                    break;

                case 'loadSocialAccounts': 
                	new SocialAccountsLoader();
                	break;

               	case 'loadCompetitors':
               		new CompetitorsLoader();
               		break;
            }
        };

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

        		new SocialAccountsLoader();
        		that.jSidebarItems = that.$('.sidebar-list-item');

        		return that;
        	}
        });

        return SettingsController;
	});

})();