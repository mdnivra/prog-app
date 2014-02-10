(function () {
    define([
        'libs',
        'utils',
        'views/baseView'
    ],function( libs, utils, BaseView){

        var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification;

        return BaseView.extend({

            el: '#main-content',

            initialize: function () {
                var that = this;

                Notification.info('Loading');
                that.render();
            },

            render: function () {
                var that = this;
                
                require(['views/'+ $(that.el).attr('data-component')], function (component) {
                    
                    if(typeof component === "function") {
                        new component();
                    } else {
                        Notification.error('Failed to load component');
                    }
                }, function (error) {
                    Notification.error('Failed to load component');
                    console.log(error);
                });
            }

        });
    });

})();