/* globals App */

App.module('Main', function (Main) {
  'use strict';

  var templates = require('./templates.js');

  Main.LayoutView = Marionette.LayoutView.extend({

    className: 'mainLayout',

    template: templates.mainLayout,

    regions: {
      repos: '.mainLayout-repos',
      issues: '.mainLayout-issues',
      issue: '.mainLayout-issue'
    }
  });
});
