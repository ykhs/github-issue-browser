/* globals App */

App.module('Main', function (Main) {
  'use strict';

  var Promise = require('bluebird');

  Main.Controller = Marionette.Controller.extend({

    show: function (region) {
      var layout = new Main.LayoutView();
      region.show(layout);

      App.execute('showRepositoryList', layout.repos);
      App.execute('showIssueList', layout.issues);
      App.execute('showIssue', layout.issue);

      this.region = region;
      this.layout = layout;
    }

  });

  var API = {
    display: function (region) {
      Main.controller.show(region);
    }
  };

  Main.addInitializer(function () {
    Main.controller = new Main.Controller();
  });

  App.commands.setHandler('showApplicationMain', function () {
    var region = App.request('surfaceRegion');
    API.display(region);
  });
});
