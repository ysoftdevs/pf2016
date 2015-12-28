var level7 = {};
level7.create = function(context) {
    // Define start coordinates
    context.character.initialX = 2*64;
    context.character.initialY = 1*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 4*64;

    // Add teleports  
    addTeleportPair(context, 3, 3, 10, 1);
 
    // Create redirector objects
    addRedirector(context, 3, 1, -1, 0, 9);
    addRedirector(context, 4, 3, 1, 0, 0);
    addRedirector(context, 5, 4, 0, 1, 6);
    addRedirector(context, 9, 1, 0, 1, 6);
    addRedirector(context, 8, 1, 0, 1, 6);
    addRedirector(context, 10, 3, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);
    addRedirector(context, 11, 3, -1, 0, 9);

    // Add moving box    
    var box = new Kiwi.GameObjects.Sprite(context, context.textures.box, 4*64, 1*64);	
    box.type = 'box';
    box.initialX = 4*64;
    box.initialY = 64;
    context.redirectorGroup.addChild(box);

    // Add moving box    
    var box2 = new Kiwi.GameObjects.Sprite(context, context.textures.box, 9*64, 3*64);	
    box2.type = 'box';
    box2.cellIndex = 1;
    box2.initialX = 9*64;
    box2.initialY = 3*64;
    context.redirectorGroup.addChild(box2);

}