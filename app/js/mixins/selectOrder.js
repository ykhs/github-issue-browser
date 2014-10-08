/* globals App */

App.module('Mixin', function (Mixin) {

  Mixin.SelectOrder = {
    selectedIndex: function () {
      var selected = this.find(function (repo) {
        return repo.selected;
      });
      return this.indexOf(selected);
    },

    selectNext: function () {
      var index = this.selectedIndex();

      index++;

      if (index >= this.length) {
        index = 0;
      }

      this.at(index).select();
    },

    selectPrev: function () {
      var index = this.selectedIndex();

      index--;

      if (index < 0) {
        index = this.length - 1;
      }

      this.at(index).select();
    }
  };
});
