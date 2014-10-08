/* globals App */

App.module('Config.User', function (User) {
  'use strict';

  var templates = require('./templates.js');

  User.ConfigView = Marionette.ItemView.extend({

    className: 'userConfig modal-dialog',
    template: templates.userConfig,

    bindings: {
      'input[name="name"]': 'name',
      'input[name="token"]': 'token'
    },

    events: {
      'submit form': 'onSubmit'
    },

    onSubmit: function (e) {
      e.preventDefault();

      App.vent.trigger('submit:user:userConfig', {
        view: this,
        model: this.model,
        collection: this.collection
      });
    },

    onRender: function () {
      this.stickit();
    }
  });
});
