var level9 = {};
level9.create = function(context) {
    // Define start coordinates
    context.character.initialX = 11*64;
    context.character.initialY = 4*64;
    context.character.initialVelocityX = 0;
    context.character.initialVelocityY = -64;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 4*64;
 
    addTeleportPair(context, 9, 3, 2, 4 );
    addTeleportPair(context, 9, 2, 7, 4 );
    addTeleportPair(context, 9, 1, 7, 3 );
    addTeleportPair(context, 10, 4, 1, 2 );
    addTeleportPair(context, 3, 3, 5, 3 );
    addTeleportPair(context, 6, 2, 5, 4 );
 
    // Create redirector objects
    
    // // Right
    addRedirector(context, 11, 3, 1, 0, 0);
    
    // // Up
    addRedirector(context, 10, 1, 0, -1, 3);
    addRedirector(context, 5, 2, 0, -1, 3);
    
    // Left
    addRedirector(context, 10, 2, -1, 0 , 9);
    addRedirector(context, 10, 3, -1, 0 , 9);

}