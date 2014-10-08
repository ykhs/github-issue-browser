/* globals App */

App.module('Config.Repository', function (Repository) {
  'use strict';

  var Promise = require('bluebird');

  Repository.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(App.vent, 'change:checkbox:repositoryConfig', this.onChangeCheckbox);
      this.listenTo(App.vent, 'submit:config:repositoryConfig', this.onSubmitConfig);
    },

    show: function (region) {
      var collection = new App.Collection.Repositories();
      var repositoryConfigView = new Repository.ConfigView({
        collection: collection
      });
      region.show(repositoryConfigView);

      Promise.all([
        App.request('fetchOrganizations', { clearCache: true }),
        App.request('fetchUserRepositories', { clearCache: true }),
        App.request('fetchUserConfig'),
        App.request('fetchRepositoryConfig')
      ])
      .spread(_.bind(function (orgs, userRepos, userConfig, repositoryConfig) {
        var remoteReposGroups = orgs;
        var userReposGroup = new App.Model.Organization({
          login: userConfig.get('name'),
          repos: userRepos
        });

        remoteReposGroups.unshift(userReposGroup);

        var watching = repositoryConfig.get('watching');

        remoteReposGroups.each(function (group) {
          group.get('repos').each(function (remoteRepo) {
            var watched = _.some(watching, function (id) {
              return remoteRepo.id === id;
            });
            if (watched) {
              remoteRepo.set('_saved', true);
            }
          });
        });

        collection.reset(remoteReposGroups.models);

        this.repositoryConfig = repositoryConfig;

      }, this));

      this.region = region;
      this.collection = collection;
      this.repositoryConfigView = repositoryConfigView;
    },

    onChangeCheckbox: function (args) {
      var checked = args.view.checked();
      var id = args.model.id;
      var watching = JSON.parse(JSON.stringify(this.repositoryConfig.get('watching')));

      if (checked) {
        watching.push(id);
      } else {
        watching = _.without(watching, id);
      }

      this.repositoryConfig.save('watching', watching);
    },

    onSubmitConfig: function (args) {
      this.trigger('save:repository');
    }
  });

  var API = {
    display: function (region) {
      return new Promise(function (resolve, reject) {
        Repository.controller.show(region);
        Repository.controller.once('save:repository', resolve);
      });
    }
  };

  Repository.addInitializer(function () {
    Repository.controller = new Repository.Controller();
  });

  App.reqres.setHandler('waitInputRepositoryConfig', function (region) {
    return API.display(region);
  });
});
