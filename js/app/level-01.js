var level1 = {};
level1.create = function(context) {
    // Define start coordinates
    context.character.initialX = 2*64;
    context.character.initialY = 2*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 7*64;
    context.finishMarker.y = 2*64;

}