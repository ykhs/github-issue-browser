/* globals App */

App.module('Collection', function (Collection) {
  'use strict';

  var Promise = require('bluebird');

  var cache = {};

  Collection.Issues = Backbone.Collection.extend({

    model: App.Model.Issue,

    initialize: function () {
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
      _.extend(this, App.Mixin.SelectOrder);
    }

  });

  var hasCache = function (repoName) {
    return !!cache[repoName];
  };

  var storeCache = function (repoName, res) {
    cache[repoName] = JSON.parse(JSON.stringify(res));
  };

  var restoreCache = function (repoName) {
    return new Collection.Issues(cache[repoName]);
  };

  var API = {
    fetchIssues: function (repo) {

      var cancelled = false;

      return new Promise(function (resolve, reject) {

        var repoName = repo.get('full_name');

        if (hasCache(repoName)) {
          resolve(restoreCache(repoName));

        } else {

          App.request('fetchUserConfig').then(function (userConfig) {
            return App.request('githubClient', userConfig);
          })
          .then(function (client) {
            return client.repoIssuesPromise({
              user: repo.get('owner').login,
              repo: repo.get('name'),
              per_page: 100
            });
          })
          .then(function (issues) {
            storeCache(repoName, issues);

            if (!cancelled) {
              resolve(new Collection.Issues(issues));
            } else {
              reject(Promise.CancellationError);
            }
          });
        }
      }).cancellable().catch(Promise.CancellationError, function (e) {
        cancelled = true;
      });
    }
  };

  App.reqres.setHandler('fetchIssues', function (repo) {
    return API.fetchIssues(repo);
  });
});
