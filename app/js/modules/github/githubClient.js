/* globals App */

App.module('Github', function (Gitbub) {
  'use strict';

  var Promise = require('bluebird');
  var GitHubApi = require('github');
  var client = null;

  function GithubClient (client, user) {
    this.client = client;
    this.user = user;
  }

  GithubClient.prototype.getNextPagePromise = function (link) {
    var client = this.client;

    return new Promise(function (resolve, reject) {
      client.getNextPage(link, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  GithubClient.prototype.reposPromise = Promise.coroutine(function* (options) {
    options = options || {};

    var res = [];
    var getAll = Promise.promisify(this.client.repos.getAll);

    _.extend(options, {
      per_page: 100
    });

    var next = yield getAll(options);
    res = res.concat(next);

    while (this.client.hasNextPage(next)) {
      next = yield this.getNextPagePromise(next);
      res = res.concat(next);
    }

    return res;
  });

  GithubClient.prototype.orgsPromise = function () {
    var client = this.client;
    var user = this.user;

    return new Promise(function (resolve, reject) {
      client.orgs.getFromUser({
        user: user.get('name')
      }, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  };

  GithubClient.prototype.reposFromOrgPromise = Promise.coroutine(function* (options) {
    options = options || {};

    var res = [];
    var getFromOrg = Promise.promisify(this.client.repos.getFromOrg);

    _.extend(options, {
      per_page: 100
    });

    var next = yield getFromOrg(options);
    res = res.concat(next);

    while (this.client.hasNextPage(next)) {
      next = yield this.getNextPagePromise(next);
      res = res.concat(next);
    }

    return res;
  });

  GithubClient.prototype.repoIssuesPromise = Promise.coroutine(function* (options) {
    options = options || {};

    var res = [];
    var repoIssues = Promise.promisify(this.client.issues.repoIssues);

    _.extend(options, {
      per_page: 100
    });

    var next = yield repoIssues(options);
    res = res.concat(next);

    while (this.client.hasNextPage(next)) {
      next = yield this.getNextPagePromise(next);
      res = res.concat(next);
    }

    return res;
  });

  var API = {
    newClient: function (user) {
      var githubClient = new GitHubApi({
        version: '3.0.0'
      });
      githubClient.authenticate({
        type: 'oauth',
        token: user.get('token')
      });
      return new GithubClient(githubClient, user);
    }
  };

  App.reqres.setHandler('githubClient', function (user) {
    if (!client) {
      client = API.newClient(user);
    }
    return client;
  });
});
