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

    // Add teleport    
    var teleport = new Kiwi.GameObjects.Sprite(context, context.textures.teleport, 3*64, 3*64);	
	teleport.animation.add('idle', [ 0, 1, 2, 3 ], 0.3, true);
	teleport.animation.play('idle', true);
    teleport.type = 'teleport';
    teleport.affectedX = 10*64;
    teleport.affectedY = 1*64;
    context.redirectorGroup.addChild(teleport);

    // Add target teleport marker
    var teleportTarget = new Kiwi.GameObjects.Sprite(context, context.textures.teleport, 10*64, 1*64);	
	teleportTarget.animation.add('idle', [ 3, 2, 1, 0 ], 0.3, true);
	teleportTarget.animation.play('idle', true);
    teleportTarget.type = 'teleport';
    teleportTarget.affectedX = 3*64;
    teleportTarget.affectedY = 3*64;
    context.redirectorGroup.addChild(teleportTarget);
 
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