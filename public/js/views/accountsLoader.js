(function () {
    define([
        'libs',
        'utils',
        'collections/accounts/socialAccounts',
        'views/baseView',
        'views/header',
        'views/accounts/accountsList',
        'constants'
    ],function( libs, utils, SocialAccountsCollection, BaseView, HeaderView, AccountsListView, constants){

        var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,

        fetchSocialAccounts = function () {
            var that = this,
                deferred =  $.Deferred();

            that.accountsCollection.fetch({
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

            initialize: function () {
                var that = this;
                that.render();
            },

            render: function () {
                var that = this;
                        
                new HeaderView();
                Notification.info('Loading');

                that.accountsCollection = new SocialAccountsCollection();

                fetchSocialAccounts.call(that).done(function () {
                        Notification.hide();
                        var accountsView = new AccountsListView({collection: that.accountsCollection});
                        $(constants.contentBodySelector).html(accountsView.render().el);
                }).fail(function () {
                        Notification.error('Server Error');
                });
            }

        });
    });

})();