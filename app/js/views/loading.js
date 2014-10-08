/* global App, Spinner */

App.module('View', function (View) {
  'use strict';

  var referenceCount = 0;

  View.Loading = Marionette.View.extend({

    initialize: function () {
      this.spinner = new Spinner({
        color: '#fff',
        lines: 12
      });
    },

    show: function (region) {
      this.spinner.spin(this.el);
      region.show(this);
    },

    onDestroy: function () {
      this.spinner.stop();
    }
  });

  View.addInitializer(function () {
    View.loading = new View.Loading();
  });

  App.commands.setHandler('showLoading', function () {
    var region = App.request('modalRegion');

    if (referenceCount < 1) {
      View.loading.show(region);
      referenceCount++;
    }
  });

  App.commands.setHandler('hideLoading', function () {
    referenceCount--;
    if (referenceCount < 1) {
      View.loading.destroy();
    }
  });
});
