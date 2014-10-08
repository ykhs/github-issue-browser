/* globals App, Spinner */

App.module('RepositoryList', function (RepositoryList) {
  'use strict';

  var templates = require('./templates');

  RepositoryList.EmptyView = Marionette.ItemView.extend({

    template: templates.empty,

    initialize: function () {
      this.spinner = new Spinner({
        color: '#fff',
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
