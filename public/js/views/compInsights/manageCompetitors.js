(function () {
	'use strict';

	define([
		'libs',
		'utils',
        'collections/competitors/competitors',
        'models/competitors/competitor',
		'views/modalView',
		'text!templates/compInsights/manageCompetitors.html',
        'text!templates/compInsights/newCompetitorRow.html',
        'messages/compInsights'
	], function (libs, utils, CompetitorsCollection, CompetitorModel, ModalView, ManageCompetitorsTemplate, NewCompetitorRowTemplate, messages) {

		var _ = libs.underscore,
            $ = libs.jquery,
            Notification = utils.Notification,
            CssClasses = utils.CssClasses,
            manageCompetitorsView,

        handleAction = function (e) {
        	var that = this,
        		jEl = $(e.currentTarget);

        	switch(jEl.attr('data-action')) {
                case 'addRow': 
                    addRow.call(that);
                    break;
                case 'save':
                    save.call(that);
                    break;
        	}

        	ModalView.prototype.handleAction.call(that, e);
        },

        closeView = function () {
            var that = this;

            ModalView.prototype.closeView.call(that);
        },

        save = function () {
            var that = this,
                competitorModel,
                inputValue,
                cLength = that.collection.length,
                toAddCollection = new CompetitorsCollection(),
                toUpdateCollection = new CompetitorsCollection(),
                jInput = that.jForm.find('[id^="competitor"]'),
                i;

            for(i = 0; i < jInput.length ; i++) {
                inputValue = $(jInput[i]).val();
                
                if(inputValue) {
                    competitorModel = new CompetitorModel();
                    competitorModel.set({
                        network_type: that.network,
                        object_id: inputValue 
                    });
                    that.fullCollection.add(competitorModel);
                    toAddCollection.add(competitorModel);
                }
             
            }

            that.jSaveBtn.button('loading');
            
            $.when(addCompetitors.call(that, toAddCollection)).done(
                function () {
                    Notification.success(messages.saved);
                    closeView.call(that);
                }
            ).fail(
                function () {
                    Notification.error(messages.errorInSaving);
                }
            );
        },

        addCompetitors = function (collection) {
            var that = this,
                deferred = $.Deferred();

            if(collection.length === 0) {
                deferred.resolve();
            } else {
                Backbone.sync("create", collection, {
                    success: function (response) {
                        deferred.resolve();
                    },
                    error: function (response) {
                        deferred.reject();
                    }
                });
            }

            return deferred.promise();
        },

        updateCompetitors = function (collection) {
            var that = this,
                deferred = $.Deferred();

            if(collection.length === 0) {
                deferred.resolve();
            } else {
                Backbone.sync("update", collection, {
                    url: collection.baseUrl + '/1',
                    success: function (response) {
                        deferred.resolve();
                    },
                    error: function (response) {
                        deferred.reject();
                    }
                });
            }

            return deferred.promise();
        },

        addRow = function () {
            var that = this;

            that.jForm.append(newRowHtm.call(that));
        },

        newRowHtm = function (competitor, id) {
            var that = this;

            that.rowCount ++;
            return that.newRowTemplate({
                i:          that.rowCount,
                messages:   messages,
                competitor: competitor,
                id:         id,
                cssClasses: CssClasses
            });

            ModalView.prototype.enableTooltip.call(that);
        },

        postRender = function () {
        	var that = this,
                jFrag = $(document.createDocumentFragment());

            that.jForm = that.$el.find('.competitor-form');
            that.jSaveBtn = that.$el.find('.save-btn');
            that.rowCount = 0;

            that.jForm.append(newRowHtm.call(that));
        },

        manageCompetitorsView = ModalView.extend({
        	events: {
        		'click [data-action]': handleAction
        	},

        	template: _.template(ManageCompetitorsTemplate),

            newRowTemplate: _.template(NewCompetitorRowTemplate),

        	initialize: function (options) {
        		var that = this;

        		$.extend(options || {}, {hasTooltip: true});
				ModalView.prototype.initialize.call(that, options);
        	},

        	render: function () {
        		var that = this;

                Notification.hide();

                that.$el.html(that.template({
                    network: that.network,
                }));
                ModalView.prototype.render.call(that);
                postRender.call(that);

				return that;
        	}
        });

        return manageCompetitorsView;
	});

})();