/* globals App */

App.module('RepositoryList', function (RepositoryList) {
  'use strict';

  var templates = require('./templates.js');

  RepositoryList.LayoutView = Marionette.LayoutView.extend({

    className: 'repositoryListLayout',
    template: templates.repositoryList.layout,

    regions: {
      header: '.repositoryListLayout-header',
      body: '.repositoryListLayout-body'
    }
  });
});
