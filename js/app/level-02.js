var level2 = {};
level2.create = function(context) {
    // Define start coordinates
    context.character.initialX = 4*64;
    context.character.initialY = 2*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 2*64;
    context.finishMarker.y = 2*64;

    // Create redirector objects
    addRedirector(context, 6, 1, -1, 0, 9);

}