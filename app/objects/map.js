var gamejs = require('gamejs');

module.exports = (function () {

    function Map(url, canvasSize) {
        this.map = new gamejs.tiledmap.Map(url);
        this.mapView = new gamejs.tiledmap.MapView(this.map);
        this.isMoving = {
            top: true,
            left: true
        };
        this.overHeight = this.mapView.viewRect.height - canvasSize[1];
        this.overWidth = this.mapView.viewRect.width - canvasSize[0];
    }

    Map.prototype.move = function (controls) {
        var top = Math.min(this.mapView.viewRect.top + controls.position.top, this.overHeight),
            left = Math.min(this.mapView.viewRect.left + controls.position.left, this.overWidth);

        this.mapView.viewRect.top = Math.max(0, top);
        this.mapView.viewRect.left = Math.max(0, left);

        return this;
    };

    Map.prototype.draw = function (display) {
        this.mapView.draw(display, [0, 0]);
        this.isMoving = {
            top: true,
            left: true
        };

        if (!this.mapView.viewRect.top || this.mapView.viewRect.top >= this.overHeight) {
            this.isMoving.top = false;
        }
        
        if (!this.mapView.viewRect.left || this.mapView.viewRect.left >= this.overWidth) {
            this.isMoving.left = false;
        }

        return this.isMoving;
    };

    return Map;
})();