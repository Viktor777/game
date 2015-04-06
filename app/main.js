var config = require('./config'),
    gamejs = require('gamejs'),
    images = [],
    Controls = require('./controls'),
    Man = require('./objects/man'),
    Map = require('./objects/map');

for (var key in config.images) {
    if (config.images.hasOwnProperty(key)) {
        images.push(config.images[key]);
    }
}
gamejs.preload(images);

gamejs.ready(function () {
    var display = gamejs.display.getSurface(),
        controls = new Controls(config.step),
        cowboy = new Man(gamejs.image.load(config.images.man), config.size),
        map = new Map(config.map, config.size);

    gamejs.display.setMode(config.size);

    gamejs.event.onKeyDown(function (event) {
        controls.update(event.key, true);
    });
    gamejs.event.onKeyUp(function (event) {
        controls.update(event.key, false);
    });

    gamejs.onTick(function (msDuration) {
        var isMapPositionChanged;

        display.clear();
        controls.calculate();
        isMapPositionChanged = map.move(controls)
            .draw(display);
        cowboy.move(controls, isMapPositionChanged, msDuration)
            .draw(display);
    });
});