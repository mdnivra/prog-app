(function () {
	'use strict';

	define([
		'libs',
		'utils',
		'constants'
	], function (libs, utils, constants) {
		
		var Backbone = libs.backbone,
			_ = libs.underscore,
			$ = libs.jquery,
			Vent = utils.Vent,

		removeView = function () {
			var that = this;
			
			this.$el.data('modal', null);
			if(that.hasTooltip) {
				that.jTooltip.tooltip('destroy');
			}
			that.undelegateEvents();
			that.$el.empty();
			//that.remove();
			this.stopListening();
		},

		postRender = function () {
			var that = this,
				jModal = that.jModal;

			jModal.modal({
				backdrop: true,
        		keyboard: true
			}); 

			jModal.on('hidden', function () {
				Vent.trigger('close-modal');
			});

			if(that.hasTooltip) {
				that.enableTooltip();
			}
		},

		modalView = Backbone.View.extend({

			el: constants.modalContentSelector,

			initialize: function (options) {
				var that = this; 

				_.extend(that, options || {});
				
				that.listenTo(Vent, 'close-modal', removeView);
			},

			render: function () {
				var that = this,
					modalSelector = constants.modalSelector;

				that.jModal = $(modalSelector);
				postRender.call(that);
			},

			handleAction: function (e) {
				var that = this,
					jEl = $(e.currentTarget);
				
				switch(jEl.attr('data-action')) {
					case 'close':
						that.closeView();
						break;
				}
			},

			closeView: function () {
				var that = this;

				$(constants.modalSelector).modal('hide');
				removeView.call(that);	
			},

			enableTooltip: function () {
				var that = this,
					jTooltip;

				that.jTooltip = jTooltip = that.$('.prog-tooltip');

				jTooltip.tooltip();
				jTooltip.on("hidden", function(e) {
				    e.stopPropagation();
				});
			}
		});

		return modalView;
	});

})();