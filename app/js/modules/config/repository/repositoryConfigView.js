/* globals App */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var templates = require('./templates.js');

  Repository.ConfigView = Marionette.CompositeView.extend({

    className: 'repositoryConfig modal-dialog',
    emptyView: Repository.EmptyView,
    childView: Repository.ListView,
    childViewContainer: '.repositoryConfig-childViewContainer',
    template: templates.repositoryConfig.container,

    ui: {
      'button': 'button[type="submit"]'
    },

    events: {
      'submit form': 'onSubmit'
    },

    childEvents: {
      'render': _.debounce(function () {
        this.onChildRender();
      }, 100)
    },

    onSubmit: function (e) {
      e.preventDefault();

      App.vent.trigger('submit:config:repositoryConfig', {
        view: this,
        model: this.model,
        collection: this.collection
      });
    },

    onChildRender: function () {
      if (this.collection.length) {
        this.ui.button.prop('disabled', false);
      } else {
        this.ui.button.prop('disabled', true);
      }
    }
  });
});
