/* globals App */

App.module('Issue', function (Issue) {
  'use strict';

  Issue.Controller = Marionette.Controller.extend({

    initialize: function () {
      this.listenTo(App.vent, 'select:issue:model', this.onIssueSelected);
    },

    show: function (region) {
      var issueView = new Issue.IssueView({
        model: new App.Model.Issue()
      });
      region.show(issueView);

      this.issueView = issueView;
    },

    onIssueSelected: function (args) {
      var issue = args.model;
      this.issueView.model.set(issue.toJSON());
    }
  });

  Issue.addInitializer(function () {
    Issue.controller = new Issue.Controller();
  });

  App.commands.setHandler('showIssue', function (region) {
    Issue.controller.show(region);
  });

});
