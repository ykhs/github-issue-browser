/* globals App */

App.module('IssueList', function (IssueList) {

  var templates = require('./templates');

  IssueList.ItemView = Marionette.ItemView.extend({

    className: 'issueListItem',

    template: templates.issueList.listItem,

    initialize: function () {
      this.listenTo(this.model, 'selected', this.onModelSelected);
      this.listenTo(this.model, 'deselected', this.onModelDeselected);
    },

    events: {
      'click .issueListItem-content': 'onClick'
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
