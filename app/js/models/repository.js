/* globals App */

App.module('Model', function (Model) {
  'use strict';

  Model.Repository = Backbone.Model.extend({

    initialize: function () {
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);

      this.on('selected', this.onSelected, this);
    },

    onSelected: function () {
      App.vent.trigger('select:repository:model', {
        model: this,
        collection: this.collection
      });
    }

  });
});
