/* globals App */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var Promise = require('bluebird');

  Repository.Model = Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('repository'),

    defaults: {
      'watching': [],
    },

    parse: function (res) {
      return res[0];
    },

    exists: function () {
     return !!this.get('watching').length;
    }
  });

  var API = {
    fetchRepositoryConfig: function () {
      return new Promise(function (resolve, reject) {
        var model = new Repository.Model();

        model.fetch({
          success: function (res) {
            resolve(res);
          },
          error: function (err) {
            reject(err);
          }
        });
      });
    }
  };

  App.reqres.setHandler('fetchRepositoryConfig', function () {
    return API.fetchRepositoryConfig();
  });
});
