/* globals App */

App.module('RepositoryList', function (RepositoryList) {

  var templates = require('./templates');

  RepositoryList.ItemView = Marionette.ItemView.extend({

    className: 'repositoryListItem',
    template: templates.repositoryList.listItem,

    initialize: function () {
      this.listenTo(this.model, 'selected', this.onModelSelected);
      this.listenTo(this.model, 'deselected', this.onModelDeselected);
    },

    events: {
      'click .repositoryListItem-content': 'onClick'
    },

    onClick: function (e) {
      this.model.select();
    },

    onModelSelected: function () {
      this.$el.addClass('isSelected');
    },

    onModelDeselected: function () {
      this.$el.removeClass('isSelected');
    }
  });

});
