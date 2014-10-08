/* globals App */

App.module('Model', function (Model) {
  'use strict';

  Model.Issue = Backbone.Model.extend({

    initialize: function () {
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);

      this.on('selected', this.onSelected, this);
    },

    onSelected: function () {
      App.vent.trigger('select:issue:model', {
        model: this,
        collection: this.collection
      });
    }
  });
});
