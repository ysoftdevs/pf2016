var level2 = {};
level2.create = function(context) {
    // Create redirector objects
    addRedirector(context, 6, 3, 1, 0, 0);
    addRedirector(context, 4, 3, 0, 1, 6);
        
    // Define player coordinates
    context.character.x = 2*64 - 8;
    context.character.y = 64 - 8;
    context.character.physics.acceleration.x = 0;
	context.character.physics.maxVelocity.y = 140;
    
    // Define finish coordinates
    context.finishMarker.x = 6*64;
    context.finishMarker.y = 4*64;
}
	
