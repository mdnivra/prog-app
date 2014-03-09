(function () {
	'use strict';

	define([
		'libs'
		], function (libs) {

			var jNotificationBlock = $('.prog-notification'),
			jAlertBlock = jNotificationBlock.find('.alert'),
			timeout, 

			showNotification = function (newClass, message, hide) {
				clearTimeout(timeout);
				jNotificationBlock.show();
				jAlertBlock.attr('class','alert ' + newClass);
				jAlertBlock.text(message);
				
				if(hide) {
					timeout = setTimeout(function() { hideNotification.call(this) }, 3000);
				}
			},

			hideNotification = function () {
				jNotificationBlock.hide();
				clearTimeout(timeout);
			},

			ProgNotifications = {
				info: function (message) {
					showNotification.call(this, 'alert-info', message);
				},

				error: function (message) {
					showNotification.call(this, 'alert-error', message, true);
				},

				success: function (message) {
					showNotification.call(this, 'alert-success', message, true);
				},

				hide: function () {
					hideNotification.call(this);
				}
			};

			return ProgNotifications;
	});
})();