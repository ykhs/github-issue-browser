/* global App */

App.module('View', function (View) {
  'use strict';

  View.ModalBackdrop = Marionette.View.extend({

    el: '.modal-backdrop',
    CLASS_IS_SHOW: 'in',

    initialize: function () {
      this.$el.hide();
      this.listenTo(App.vent, 'beforeShowModalRegion', this.onBeforeShowModalRegion);
      this.listenTo(App.vent, 'emptyModalRegion', this.onEmptyModalRegion);
    },

    onBeforeShowModalRegion: function () {
      this.$el.show();
      _.defer(_.bind(function () {
        this.$el.addClass(this.CLASS_IS_SHOW);
      }, this));
    },

    onEmptyModalRegion: function () {
      this.$el.one('transitionend', _.bind(function () {
        this.$el.hide();
      }, this));

      this.$el.removeClass(this.CLASS_IS_SHOW);
    }
  });

  View.addInitializer(function () {
    View.modalBackdrop = new View.ModalBackdrop();
  });
});
