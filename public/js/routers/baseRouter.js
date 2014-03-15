(function () {
	'use strict';

	define([
		'libs',
		'utils'
	], function (libs, utils) {

		var Backbone = libs.backbone,
			_ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            Vent = utils.Vent,
            BaseRouter;

        BaseRouter = Backbone.Router.extend({

        });

        return BaseRouter;

	});
})();