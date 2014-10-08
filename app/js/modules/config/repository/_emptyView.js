/* globals App, Spinner */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var templates = require('./templates');

  Repository.EmptyView = Marionette.ItemView.extend({

    template: templates.empty,

    initialize: function () {
      this.spinner = new Spinner({
        color: '#686868',
        lines: 12
      });
    },

    onRender: function () {
      this.spinner.spin(this.el);
    },

    onDestroy: function () {
      this.spinner.stop();
    }
  });
});
