var level6 = {};
level6.create = function(context) {
    // Define start coordinates
    context.character.initialX = 2*64;
    context.character.initialY = 1*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 4*64;

    // Add teleports  
    addTeleportPair(context, 3, 3, 10, 1)
 
    // Create redirector objects
    addRedirector(context, 3, 1, -1, 0, 9);
    addRedirector(context, 4, 3, 1, 0, 0);
    addRedirector(context, 5, 4, 0, 1, 6);
    addRedirector(context, 10, 3, 0, 1, 6);

    // Add moving box    
    var box = new Kiwi.GameObjects.Sprite(context, context.textures.box, 4*64, 1*64);	
    box.type = 'box';
    box.initialX = 4*64;
    box.initialY = 64;
    context.redirectorGroup.addChild(box);

}