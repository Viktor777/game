var gamejs = require('gamejs');

module.exports = (function () {

    function Controls(step) {
        this.step = step;

        this.reset();
    }

    Controls.prototype.update = function (key, state) {

        switch (key) {
            case gamejs.event.K_UP:
            case gamejs.event.K_w:
                this.up = state;

                break;
            case gamejs.event.K_RIGHT:
            case gamejs.event.K_d:
                this.right = state;

                break;
            case gamejs.event.K_DOWN:
            case gamejs.event.K_s:
                this.down = state;

                break;
            case gamejs.event.K_LEFT:
            case gamejs.event.K_a:
                this.left = state;

                break;
            default:
                break;
        }

        return this;
    };

    Controls.prototype.reset = function () {
        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;
        this.direction = 'down';
        this.move = false;
        this.position = {
            left: 0,
            top: 0
        };

        return this;
    };

    Controls.prototype.calculate = function () {
        this.move = false;
        this.position = {
            left: 0,
            top: 0
        };

        if (this.up && this.right) {
            this.position.top = -this.step/2;
            this.position.left = this.step/2;
            this.direction = 'UpRight';
            this.move = true;
        } else if (this.up && this.left) {
            this.position.top = -this.step/2;
            this.position.left = -this.step/2;
            this.direction = 'UpLeft';
            this.move = true;
        } else if (this.down && this.right) {
            this.position.top = this.step/2;
            this.position.left = this.step/2;
            this.direction = 'DownRight';
            this.move = true;
        } else if (this.down && this.left) {
            this.position.top = this.step/2;
            this.position.left = -this.step/2;
            this.direction = 'DownLeft';
            this.move = true;
        } else if (this.up) {
            this.position.top = -this.step;
            this.direction = 'Up';
            this.move = true;
        } else if (this.right) {
            this.position.left = this.step;
            this.direction = 'Right';
            this.move = true;
        } else if (this.down) {
            this.position.top = this.step;
            this.direction = 'Down';
            this.move = true;
        } else if (this.left) {
            this.position.left = -this.step;
            this.direction = 'Left';
            this.move = true;
        }

        return this;
    };

    return Controls;
})();