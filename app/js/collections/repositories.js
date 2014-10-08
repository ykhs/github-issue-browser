/* globals App */

App.module('Collection', function (Collection) {
  'use strict';

  var Promise = require('bluebird');

  var cache = null;

  Collection.Repositories = Backbone.Collection.extend({

    model: App.Model.Repository,

    comparator: 'full_name',

    initialize: function () {
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
      _.extend(this, App.Mixin.SelectOrder);
    }

  });

  var hasCache = function () {
    return !!cache;
  };

  var storeCache = function (res) {
    cache = JSON.parse(JSON.stringify(res));
  };

  var restoreCache = function () {
    return new Collection.Repositories(cache);
  };

  var deleteCache = function () {
    cache = null;
  };

  var API = {
    fetchUserRepositories: Promise.coroutine(function* (options) {

      if (options.clearCache) {
        deleteCache();
      }

      if (hasCache()) {
        return restoreCache();
      }

      var userConfig = yield App.request('fetchUserConfig');
      var client = App.request('githubClient', userConfig);
      var repos = yield client.reposPromise();
      storeCache(repos);
      return new Collection.Repositories(repos);
    })
  };

  App.reqres.setHandler('fetchUserRepositories', function (options) {
    options = options || {};
    return API.fetchUserRepositories(options);
  });
});
