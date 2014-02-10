(function () {
    define([
        'libs',
        'utils',
        'collections/socialapps/socialApps',
        'views/baseView',
        'views/socialapps/socialAppsList',
        'constants'
    ],function( libs, utils, SocialAppsCollection, BaseView, SocialAppsListView, constants){

        var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,

        fetchSocialApps = function () {
            var that = this,
                deferred =  $.Deferred();

            that.socialAppsCollection.fetch({
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

            render: function () {
                var that = this;
                        
                Notification.info('Loading');

                that.socialAppsCollection = new SocialAppsCollection();

                fetchSocialApps.call(that).done(function () {
                    Notification.hide();
                    var socialAppsView = new SocialAppsListView({collection: that.socialAppsCollection});
                    $(constants.contentBodySelector).html(socialAppsView.render().el);
                }).fail(function () {
                    Notification.error('Server Error');
                });
            }

        });
    });

})();