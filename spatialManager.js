/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0           1            2            3         4            5            6         7            8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],
// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {
    return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    
    // Register incremented ID
    this._entities[spatialID] = entity;
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    var i = 0;

    for (i; i < this._entities.length; i++) {
        var e = this._entities[i];
        if (e instanceof Entity) {
            // if the same, cut off the array
            if (e.getSpatialID() == entity.getSpatialID()) {
                this._entities.splice(i, 1);
                break;
            }
        }
    }

},

findEntityInRange: function(posX, posY, radius) {
    var i = 0;
    
    for (i; i < this._entities.length; i++) {
        var e = this._entities[i];
        if (e) {
            // For each entitty get their position
            var pos = e.getPos();

            // Get the distance of two
            var dist = util.distSq(pos.posX, pos.posY, posX, posY);
            // Sum of two rads
            var rad = e.getRadius() + radius;
             // Debug -----
            document.getElementById('debugX').innerHTML=pos.posX;
            document.getElementById('debugY').innerHTML=pos.posY;
            document.getElementById('radius').innerHTML=radius;
            document.getElementById('distance').innerHTML=dist;
            // -----------

            if (dist < util.square(rad)) {
                return e;
            }
        }
    }

    return false;
},

render: function(ctx) {
     var oldStyle = ctx.strokeStyle;
     ctx.strokeStyle = "red";

     for (var ID in this._entities) {
          var e = this._entities[ID];
         if (e instanceof Entity) {
             var pos = e.getPos();
             util.strokeCircle(ctx, pos.posX, pos.posY, e.getRadius());
         }
     }
     ctx.strokeStyle = oldStyle;
}

}
