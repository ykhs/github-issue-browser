/* global App */

(function () {
  'use strict';

  var Promise = require('bluebird');

  window.App = new Marionette.Application();

  App.on('start', function () {

    Promise.coroutine(function* () {
      var region = App.request('modalRegion');

      var userConfig = yield App.request('fetchUserConfig');
      if (!userConfig.exists()) {
        yield App.request('waitInputUserConfig', region);
      }

      var repositoryConfig = yield App.request('fetchRepositoryConfig');
      if (_.isEmpty(repositoryConfig.get('watching'))) {
        yield App.request('waitInputRepositoryConfig', region);
      }

      region.empty();

      App.execute('showApplicationMain');
    })();
  });
})();
