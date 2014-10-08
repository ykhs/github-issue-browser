/* globals App */

App.module('Config.User', function (User) {
  'use strict';

  User.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(App.vent, 'submit:user:userConfig', this.onSubmitConfig);
    },

    show: function (region) {
      var userConfigPromise = App.request('fetchUserConfig');

      userConfigPromise.then(_.bind(function (userConfig) {
        this.userConfigView = new User.ConfigView({
          model: userConfig
        });

        region.show(this.userConfigView);
      }, this));

      this.region = region;
    },

    onSubmitConfig: function (args) {
      var userModel = args.model;
      userModel.save();
      this.trigger('save:user');
    }
  });

  var API = {
    display: function (region) {
      return new Promise(function (resolve, reject) {
        User.controller.show(region);
        User.controller.once('save:user', resolve);
      });
    }
  };

  User.addInitializer(function () {
    User.controller = new User.Controller();
  });

  App.commands.setHandler('destroyUserConfig', function () {
    API.destroy();
  });

  App.reqres.setHandler('waitInputUserConfig', function (region) {
    return API.display(region);
  });
});
