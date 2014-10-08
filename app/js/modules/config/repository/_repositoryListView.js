/* globals App */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var templates = require('./templates.js');

  Repository.ListView = Marionette.CompositeView.extend({

    className: 'repositoryConfigList',
    childView: Repository.ItemView,
    childViewContainer: '.repositoryConfigList-childViewContainer',
    template: templates.repositoryConfig.list,

    initialize: function () {
      this.collection = this.model.get('repos');
    }
  });
});
