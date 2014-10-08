/* globals App */

App.module('Collection', function (Collection) {
  'use strict';

  var Promise = require('bluebird');

  var cache = null;

  Promise.coroutine.addYieldHandler(function (yieldedValue) {
    if (Array.isArray(yieldedValue)) {
      return Promise.all(yieldedValue);  
    }
  });

  Collection.Organizations = Backbone.Collection.extend({
    model: App.Model.Organization,

    parse: function (res) {
      res.forEach(function (org) {
        if (_.has(org, 'repos')) {
          org.repos = new Collection.Repositories(org.repos);
        }
      });
      return res;
    }
  });

  var hasCache = function () {
    return !!cache;
  };

  var storeCache = function (collection) {
    cache = JSON.parse(JSON.stringify(collection));
  };

  var restoreCache = function () {
    var collection = new Collection.Organizations();
    collection.set(cache, { parse: true });
    return collection;
  };

  var deleteCache = function () {
    cache = null;
  };

  var API = {
    fetchRemoteOrgs: Promise.coroutine(function* (options) {

      if (options.clearCache) {
        deleteCache();
      }

      if (hasCache()) {
        return restoreCache();
      }

      var userConfig = yield App.request('fetchUserConfig');
      var client = App.request('githubClient', userConfig);

      var orgs = yield client.orgsPromise();
      var orgsCollection = new Collection.Organizations(orgs);

      var orgRepos = yield orgsCollection.map(function (org) {
          return client.reposFromOrgPromise({
            org: org.get('login')
          });
      });

      orgsCollection.each(function (org, i) {
        org.set('repos', new Collection.Repositories(orgRepos[i]));
      });

      storeCache(orgsCollection);

      return orgsCollection;
    })
  };

  App.reqres.setHandler('fetchOrganizations', function (options) {
    options = options || {};
    return API.fetchRemoteOrgs(options);
  });
});
