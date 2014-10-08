/* globals App, Mousetrap */

App.module('IssueList', function (IssueList) {

  var gui = require('nw.gui');

  IssueList.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(App.vent, 'select:repository:model', this.onRepositorySelected);
      Mousetrap.bind('j', _.bind(this.onPressJ, this));
      Mousetrap.bind('k', _.bind(this.onPressK, this));
      Mousetrap.bind('b', _.bind(this.onPressB, this));
    },

    show: function (region) {
      var collection = new App.Collection.Issues();
      var view = new IssueList.ListView({
        collection: collection
      });
      region.show(view);

      this.region = region;
      this.issuesCollection = collection;
      this.issueListView = view;
    },

    onRepositorySelected: function (args) {
      var repo = args.model;

      if (this.issuesPromise) {
        this.issuesPromise.cancel();
        delete this.issuesPromise;
      }

      var promise = App.request('fetchIssues', repo);

      promise.then(_.bind(function (collection) {
        if (collection) {
          this.issuesCollection.reset(collection.toJSON());
        }
      }, this));

      this.issuesPromise = promise;
    },

    onPressJ: function () {
      if (!this.issueListView) {
        return;
      }
      this.issuesCollection.selectNext();
    },

    onPressK: function () {
      if (!this.issueListView) {
        return;
      }
      this.issuesCollection.selectPrev();
    },

    onPressB: function () {
      if (!this.issuesCollection) {
        return;
      }
      var url = this.issuesCollection.selected.get('html_url');
      gui.Shell.openExternal(url);
    },

    onDestroy: function () {
      if (this.issueListView) {
        this.issueListView.destroy();
        delete this.issueListView;
      }

      if (this.issuesCollection) {
        delete this.issuesCollection;
      }

      if (this.region) {
        delete this.region;
      }

      Mousetrap.unbind('j');
      Mousetrap.unbind('k');
      Mousetrap.unbind('b');
    }

  });

  var API = {
    display: function (region) {
      IssueList.controller.show(region);
    }
  };

  IssueList.addInitializer(function () {
    IssueList.controller = new IssueList.Controller();
  });

  App.commands.setHandler('showIssueList', function (region) {
    API.display(region);
  });
});
