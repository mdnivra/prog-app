(function () {
	'use strict';

	define([
		'libs'
		], function (libs) {

			var jNotificationBlock = $('.prog-notification'),
			jAlertBlock = jNotificationBlock.find('.alert'),
			timeout, 

			showNotification = function (newClass, message) {
				clearTimeout(timeout);
				jNotificationBlock.show();
				jAlertBlock.attr('class','alert ' + newClass);
				jAlertBlock.text(message);
				timeout = setTimeout(function() { hideNotification.call(this) }, 3000);
			},

			hideNotification = function () {
				jNotificationBlock.hide();
			},

			ProgNotifications = {
				info: function (message) {
					showNotification.call(this, 'alert-info', message);
				},

				error: function (message) {
					showNotification.call(this, 'alert-error', message);
				},

				success: function (message) {
					showNotification.call(this, 'alert-success', message);
				},

				hide: function () {
					hideNotification.call(this);
				}
			};

			return ProgNotifications;
	});
})();