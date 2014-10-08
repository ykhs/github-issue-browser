/* global App */

App.module('Region', function (Region) {
  'use strict';

  Region.ModalRegion = Marionette.Region.extend({

    CLASS_IS_SHOW: 'in',

    el: '.modal',

    initialize: function () {
      this.$el.hide();
    },

    onBeforeShow: function () {
      App.vent.trigger('beforeShowModalRegion');
      this.$el.show();
    },

    onShow: function () {
      var self = this;
      _.defer(function () {
        self.$el.addClass(self.CLASS_IS_SHOW);
      });
    },

    onEmpty: function () {
      this.$el.hide();
      App.vent.trigger('emptyModalRegion');
    }
  });

  Region.addInitializer(function () {
    Region.modalRegion = new Region.ModalRegion();
  });

  App.reqres.setHandler('modalRegion', function () {
    return Region.modalRegion;
  });
});
