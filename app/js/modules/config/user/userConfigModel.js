/* globals App */

App.module('Config.User', function (User) {
  'use strict';

  var Promise = require('bluebird');

  User.Model = Backbone.Model.extend({

    localStorage: new Backbone.LocalStorage('user'),

    defaults: {
      'name': '',
      'token': ''
    },

    parse: function (res) {
      return res[0];
    },

    exists: function () {
     return !!(this.get('name') && this.get('token'));
    }
  });

  var API = {
    fetchUserConfig: function () {
      return new Promise(function (resolve, reject) {
        var model = new User.Model();

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

  App.reqres.setHandler('fetchUserConfig', function () {
    return API.fetchUserConfig();
  });
});
