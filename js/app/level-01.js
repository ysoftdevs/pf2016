var level1 = {};
level1.create = function(context) {
    // Create redirector objects
    
    addRedirector(context, 10, 2, 1, 0, 0);
    addRedirector(context, 10, 3, 0, 1, 6);
        
    // Define player coordinates
    context.character.x = 2*64 - 8;
    context.character.y = 64 - 8;
    context.character.physics.acceleration.x = 0;
	context.character.physics.maxVelocity.y = 140;
    
    // Define finish coordinates
    context.finishMarker.x = 6*64;
    context.finishMarker.y = 4*64;

    // Create collision layer
    for(var i = 21; i < context.tilemap.tileTypes.length; i++) {
		context.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;
	}

}
	
