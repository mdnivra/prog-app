(function () {
	'use strict';
	
	define([
		'vent',
		'utils/progNotifications',
		'utils/cssClasses'
		],function(Vent, Notification, CssClasses){

		return {
			Vent: Vent,
			Notification: Notification,
			CssClasses: CssClasses
		};
	});
})();