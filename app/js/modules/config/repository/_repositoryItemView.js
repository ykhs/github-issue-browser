/* globals App, Spinner */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var templates = require('./templates.js');

  Repository.ItemView = Marionette.ItemView.extend({

    tagName: 'li',

    template: templates.repositoryConfig.listItem,

    ui: {
      'checkbox': 'input[type="checkbox"]'
    },

    events: {
      'change @ui.checkbox': 'onChange'
    },

    checked: function () {
      return this.ui.checkbox.prop('checked');
    },

    onChange: function (e) {
      App.vent.trigger('change:checkbox:repositoryConfig', {
        view: this,
        model: this.model,
        collection: this.colletion
      });
    },

    onRender: function () {
      if (this.model.get('_saved')) {
        this.ui.checkbox.prop('checked', true);
      }
    }
  });
});
