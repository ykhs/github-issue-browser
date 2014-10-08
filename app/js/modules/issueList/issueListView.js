/* globals App */

App.module('IssueList', function (IssueList) {

  var templates = require('./templates');

  IssueList.ListView = Marionette.CompositeView.extend({
    className: 'issueList',
    template: templates.issueList.list,
    childView: IssueList.ItemView,
    childViewContainer: '.issueList-childViewContainer'
  });

});
