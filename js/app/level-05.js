var level5 = {};
level5.create = function(context) {
    // Define finish coordinates
    context.finishMarker.x = 8*64;
    context.finishMarker.y = 2*64;

    // Add teleport    
    var teleport = new Kiwi.GameObjects.Sprite(context, context.textures.teleport, 4*64, 2*64);	
	teleport.animation.add('idle', [ 0, 1, 2, 3 ], 0.3, true);
	teleport.animation.play('idle', true);
    teleport.type = 'teleport';
    teleport.affectedX = 9*64;
    teleport.affectedY = 2*64;
    context.redirectorGroup.addChild(teleport);

    // Add target teleport marker
    var teleportTarget = new Kiwi.GameObjects.Sprite(context, context.textures.teleport, 9*64, 2*64);	
	teleportTarget.animation.add('idle', [ 3, 2, 1, 0 ], 0.3, true);
	teleportTarget.animation.play('idle', true);
    teleportTarget.type = 'teleport';
    teleportTarget.affectedX = 4*64;
    teleportTarget.affectedY = 2*64;
    context.redirectorGroup.addChild(teleportTarget);

    // Create redirector objects
    addRedirector(context, 9, 1, -1, 0, 9);
    addRedirector(context, 9, 3, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);

}