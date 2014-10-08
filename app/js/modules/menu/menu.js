/* globals App */

App.module('Menu', function (Menu) {

  Menu.addInitializer(function () {
    var nw = require('nw.gui');
    var win = nw.Window.get();
    var nativeMenuBar = new nw.Menu({ type: 'menubar' });
    nativeMenuBar.createMacBuiltin('Github Issues');
    win.menu = nativeMenuBar;
  });
});
