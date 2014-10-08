/* globals App */

App.module('RepositoryList', function (RepositoryList) {

  var templates = require('./templates');

  RepositoryList.ListView = Marionette.CompositeView.extend({
    className: 'repositoryList',
    template: templates.repositoryList.list,
    emptyView: RepositoryList.EmptyView,
    childView: RepositoryList.ItemView,
    childViewContainer: '.repositoryList-childViewContainer'
  });

});
