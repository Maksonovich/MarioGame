function CreatedLevels() {
  let view = View.getInstance();

  let storage;
  let levelsWrapper;

  let that = this;

  this.init = function() {
    let mainWrapper = view.getMainWrapper();
    let deleteAllBtn = view.create('button');
    levelsWrapper = view.create('div');

    view.addClass(levelsWrapper, 'levels-wrapper');
    view.addClass(deleteAllBtn, 'delete-all-btn');
    view.style(levelsWrapper, { display: 'block' });
    view.append(levelsWrapper, deleteAllBtn);
    view.append(mainWrapper, levelsWrapper);

    deleteAllBtn.onclick = that.deleteAllMaps;

    storage = new Storage();

    that.showLevels();
  };

  this.showLevels = function() {
    let totalStoredLevels = storage.getLength();

    if (totalStoredLevels != 0) {
      for (let i = 1; i < totalStoredLevels; i++) {
        let levelButton = view.create('div');
        let levelName = storage.getItemName(i);

        view.setHTML(levelButton, levelName);
        view.addClass(levelButton, 'level-btn');
        view.append(levelsWrapper, levelButton);

        levelButton.onclick = (function(i) {
          return function() {
            that.startLevel(i);
            that.removeCreatedLevelsScreen();
          };
        })(i);
      }
    } else {
      let noMapsMessage = view.create('div');

      view.addClass(noMapsMessage, 'no-maps');
      view.setHTML(noMapsMessage, 'No maps currently saved. Please use the Level Editor to create custom Maps');
      view.append(levelsWrapper, noMapsMessage);
    }
  };

  this.deleteAllMaps = function() {
    storage.clear();

    that.removeCreatedLevelsScreen();
    that.init();
  };

  this.startLevel = function(i) {
    let marioMakerInstance = MarioMaker.getInstance();
    let levelName = storage.getItemName(i);
    let level = storage.getItem(levelName);
    let map = { 1: level }; 

    marioMakerInstance.startGame(map);
  };

  this.showCreatedLevelsScreen = function() {
    if (levelsWrapper) {
      view.style(levelsWrapper, { display: 'block' });
    }
  };

  this.removeCreatedLevelsScreen = function() {
    if (levelsWrapper) {
      view.style(levelsWrapper, { display: 'none' });

      while (levelsWrapper.hasChildNodes()) {
        view.remove(levelsWrapper, levelsWrapper.lastChild);
      }
    }
  };
}
