/* globals App */

App.module('Issue', function (Issue) {

  var templates = require('./templates');

  Issue.IssueView = Marionette.ItemView.extend({

    className: 'issue',

    template: templates.issue.issue,

    bindings: {
      '.issue-iframe': {
        attributes: [{
          name: 'src',
          observe: 'html_url'
        }]
      }
    },

    initialize: function () {
    },

    onRender: function () {
      this.stickit();
    }

  });

});
