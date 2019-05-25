
/* @preserve

    POLYDIV v1.0.1
    ----------------------------------------------------
    git repo: https://github.com/radiium/polydiv
    Description: Clipping html element in random polygon

*/

(function (root, factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory(root));
	} else if ( typeof exports === 'object' ) {
		module.exports = factory(root);
	} else {
		root.Polydiv = factory(root);
	}
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

    'use strict';

    var Constructor = function (options) {

        var Polydiv = {
            items: [],
            settings: {}
        };

        var defaults = {
            itemClass: 'polydiv',
        };

        /**
         *
         *  PUBLIC METHODS
         *
         */

        // Init polydiv
        Polydiv.init = function(opts) {
            this.settings = Object.assign({}, defaults, opts || {});
            this.items = getItems(opts.itemClass);
        }

        // Destroy polydiv
        Polydiv.destroy = function() {
            this.settings = Object.assign({}, defaults);
            this.unClipItems();
            this.items = [];
        }

        // Add random clip-path rules on each items
        Polydiv.clipItems = function(callback) {

            for (var i = 0; i < this.items.length; i++) {
                var points = generateRandomPoints();
                var clipPathRule = this.pointsToClipPathRule(points);
                this.items[i].style.clipPath = clipPathRule;
            }

            if (callback && typeof callback === 'function') {
                var msg = (this.items.length === 0) ? 'No items to clip...' : null;
                callback(msg);
            }
        }

        // Remove clip-path rules on each items
        Polydiv.unClipItems = function(callback) {
            for (var i = 0; i < this.items.length; i++) {
                this.items[i].style.clipPath = '';
            }
        }

        /**
         *
         *  PRIVATE METHODS
         *
         */

         // Get HTML items
        var getItems = function(itemsQuery) {
            return document.querySelectorAll(itemsQuery);
        }

        // Set points to a clip-path rules
        Polydiv.pointsToClipPathRule = function(points) {
            var str = [];
            var hulls = makeHull(points);
            for (var i = 0; i < hulls.length; i++) {
                var h = hulls[i];
                str.push(h.x + '% ' + h.y + '%')
            }
            var clip = 'polygon(' + str.join(',') +')';
            /*
            '-webkit-clip-path: polygon(' + str.join(',') + ');' +
                    'clip-path: polygon(' + str.join(',') +');';
            */

            return clip;
        }

        // Generate random number of random 2d coordinates
        function generateRandomPoints() {
            var numPoints = getRandom(6, 180); // Math.round(Math.pow(30, Math.random()) * 6);
            var points = [];
            for (var i = 0; i < numPoints; i++) {
                points.push({
                    x: getRandomBetween(0, 100),
                    y: getRandomBetween(0, 100),
                });
            }

            return points;
        }

        // Algorithm from https://www.nayuki.io/page/convex-hull-algorithm
        // Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.
        var makeHull = function(points) {

            points.sort(POINT_COMPARATOR);

            if (points.length <= 1) {
                return points.slice();
            }

            var upperHull = [];
            for (var i = 0; i < points.length; i++) {
                var p = points[i];
                while (upperHull.length >= 2) {
                    var q = upperHull[upperHull.length - 1];
                    var r = upperHull[upperHull.length - 2];

                    if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                        upperHull.pop();
                    else
                        break;
                }
                upperHull.push(p);
            }
            upperHull.pop();

            var lowerHull = [];
            for (var i = points.length - 1; i >= 0; i--) {
                var p = points[i];
                while (lowerHull.length >= 2) {
                    var q = lowerHull[lowerHull.length - 1];
                    var r = lowerHull[lowerHull.length - 2];
                    if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x))
                        lowerHull.pop();
                    else
                        break;
                }
                lowerHull.push(p);
            }
            lowerHull.pop();

            if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
                return upperHull;
            else
                return upperHull.concat(lowerHull);
        };

        // Points value comparator
        var POINT_COMPARATOR = function(a, b) {
            if (a.x < b.x)
                return -1;
            else if (a.x > b.x)
                return +1;
            if (a.y < b.y)
                return -1;
            else if (a.y > b.y)
                return +1;
            else
                return 0;
        };

        // Generate random number between min and max
        var getRandomBetween = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        // Generate random number between 6 and 180
        var getRandom = function() {
            return Math.round(Math.pow(30, Math.random()) * 6);
        };

        /**
         *
         *  INIT PLUGIN
         *
         */

		Polydiv.init(options);

		return Polydiv;
	};

	return Constructor;;
});
