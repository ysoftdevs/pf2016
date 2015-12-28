var level9 = {};
level9.create = function(context) {
    // Define start coordinates
    context.character.initialX = 11*64;
    context.character.initialY = 4*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 4*64;
 
 
 
    // Create redirector objects
    
    // // Right
    // addRedirector(context, 11, 3, 1, 0, 0);
    // addRedirector(context, 11, 2, 1, 0, 0);
    // addRedirector(context, 11, 1, 1, 0, 0);
    // addRedirector(context, 9, 3, 1, 0, 0);
    
    // // Down
    // addRedirector(context, 10, 3, 0, 1, 6);
    // addRedirector(context, 10, 1, 0, 1, 6);
    // addRedirector(context, 9, 1, 0, 1, 6);
    
    // // Up
    // addRedirector(context, 10, 2, 0, -1, 3);
    // addRedirector(context, 9, 2, 0, -1, 3);
    

}