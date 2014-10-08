/* globals App */

App.module('RepositoryList', function (RepositoryList) {

  var Promise = require('bluebird');

  var templates = require('./templates');

  RepositoryList.HeaderView = Marionette.ItemView.extend({

    className: 'repositoryListHeader',
    template: templates.repositoryList.header,

    initialize: function () {
      this.model = new Backbone.Model({});
    },

    ui: {
      config: '.repositoryListHeader-config'
    },

    events: {
      'click @ui.config': 'onClickConfig'
    },

    onClickConfig: Promise.coroutine(function* (e) {
      var region = App.request('modalRegion');
      var repositoryConfig = yield App.request('fetchRepositoryConfig');
      yield App.request('waitInputRepositoryConfig', region);
      region.empty();
      App.vent.trigger('update:repositoryConfig:repositoryList');
    })

  });
});
