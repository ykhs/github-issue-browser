/* globals App, Mousetrap */

App.module('RepositoryList', function (RepositoryList) {

  var Promise = require('bluebird');

  RepositoryList.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(App.vent, 'update:repositoryConfig:repositoryList', this.onUpdateRepositoryConfig);
      Mousetrap.bind('p', _.bind(this.onPressP, this));
      Mousetrap.bind('n', _.bind(this.onPressN, this));
    },

    show: Promise.coroutine(function* (region) {
      var collection = new App.Collection.Repositories();
      var layoutView = new RepositoryList.LayoutView();
      var repositoryListView = new RepositoryList.ListView({
        collection: collection
      });
      var repositoryHeaderView = new RepositoryList.HeaderView();

      region.show(layoutView);
      layoutView.body.show(repositoryListView);
      layoutView.header.show(repositoryHeaderView);

      // combine repositories collection from organization's and user's
      var reposByOrgs = yield App.request('fetchOrganizations');
      var userRepos = yield App.request('fetchUserRepositories');
      var orgRepos = reposByOrgs.reduce(function (memo, org) {
        return memo.concat(org.get('repos').models);
      }, []);
      var repos = orgRepos.concat(userRepos.models);

      // filter repositories by user settings that memolized at localStorage
      var repositoryConfig = yield App.request('fetchRepositoryConfig');
      var watching = repositoryConfig.get('watching');
      repos = repos.filter(function (repo) {
        return _.contains(watching, repo.id);
      });

      // make deepcopy for cut off Array's relations with origin collection
      var clone = JSON.parse(JSON.stringify(repos));

      collection.reset(clone);

      this.region = region;
      this.collection = collection;
      this.repositoryHeaderView = repositoryHeaderView;
      this.repositoryListView = repositoryListView;
    }),

    onPressP: function () {
      if (!this.repositoryListView || !this.collection) {
        return;
      }
      this.collection.selectPrev();
    },

    onPressN: function () {
      if (!this.repositoryListView || !this.collection) {
        return;
      }
      this.collection.selectNext();
    },

    onUpdateRepositoryConfig: function () {
      this.show(this.region);
    },

    onDestroy: function () {
      if (this.repositoryHeaderView) {
        this.repositoryHeaderView.destroy();
        delete this.repositoryHeaderView;
      }

      if (this.repositoryListView) {
        this.repositoryListView.destroy();
        delete this.repositoryListView;
      }

      if (this.collection) {
        delete this.collection;
      }

      if (this.region) {
        delete this.region;
      }

      Mousetrap.unbind('p');
      Mousetrap.unbind('n');
    }

  });

  var API = {
    display: function (region) {
      RepositoryList.controller.show(region);
    }
  };

  RepositoryList.addInitializer(function () {
    RepositoryList.controller = new RepositoryList.Controller();
  });

  App.commands.setHandler('showRepositoryList', function (region) {
    API.display(region);
  });
});
