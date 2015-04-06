var gamejs = require('gamejs'),
    states = require('./man/states'),
    string = require('../helpers/string');

module.exports = (function () {

    function Man(image, canvasSize) {
        this.height = 50;
        this.width = 50;
        this.sprite = new gamejs.animate.SpriteSheet(image, {
            height: 120,
            width: 120,
            scaleTo: [
                this.height,
                this.width
            ],
            spacing: 8
        });
        this.states = states;
        this.animation = new gamejs.animate.Animation(this.sprite, 'down', this.states);
        this.canvas = {
            height: canvasSize[1],
            width: canvasSize[0]
        };

        this.reset();
        /**
         * @TODO: implement collision mask
         */
        //this.mask = new gamejs.pixelcollision.Mask(this.image);
    }

    Man.prototype.move = function (controls, isMapPositionChanged, msDuration) {
        var direction;

        if (!controls.direction) {
            direction = 'down';
        } else {
            direction = controls.move ? 'move' + controls.direction : string.firstToLowerCase(controls.direction);
        }
        this.animation.setState(direction);
        this.animation.update(msDuration);

        if (!isMapPositionChanged.top) {
            this.top = Math.max(0, this.top + controls.position.top);
            this.top = Math.min(this.top, this.canvas.height - 3/2*this.height);
        }

        if (!isMapPositionChanged.left) {
            this.left = Math.max(0, this.left + controls.position.left);
            this.left = Math.min(this.left, this.canvas.width - 3/2*this.width);
        }

        return this;
    };

    Man.prototype.draw = function (display) {
        display.blit(this.animation.image, [this.left, this.top]);

        return this;
    };

    Man.prototype.reset = function () {
        this.top = this.canvas.height/2 - this.height/2;
        this.left = this.canvas.width/2 - this.width/2;

        return this;
    };

    return Man;
})();