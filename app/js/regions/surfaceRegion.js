/* global App */

App.module('Region', function (Region) {
  'use strict';

  Region.SurfaceRegion = Marionette.Region.extend({
    el: '.surface',

    initialize: function () {
      this.$el.hide();
    },

    onBeforeShow: function () {
      this.$el.show();
    },

    onEmpty: function () {
      this.$el.hide();
    }
  });

  Region.addInitializer(function () {
    Region.surfaceRegion = new Region.SurfaceRegion();
  });

  App.reqres.setHandler('surfaceRegion', function () {
    return Region.surfaceRegion;
  });
});
