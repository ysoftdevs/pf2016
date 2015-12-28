/**
 * Register new redirector
 */
function addRedirector(context, x, y, vectorX, vectorY, imageIndex) {
    var redirector = new Kiwi.GameObjects.Sprite(context, context.textures.oneWay, x*64, y*64); 
    redirector.type = 'vector';
    redirector.affectVelocityX = context.velocityX * vectorX;
    redirector.affectVelocityY = context.velocityY * vectorY;
    redirector.cellIndex = imageIndex;
    redirector.input.enableDrag(true);
    redirector.input.onDragStarted.add(context.startedDrag, context);
    redirector.input.onDragStopped.add(context.stoppedDrag, context );

    context.redirectorGroup.addChild(redirector);
}

/**
 * Register new teleport
 */
function addTeleport(context, x, y, affectedX, affectedY, isForwardAnimation) {
    var teleport = new Kiwi.GameObjects.Sprite(context, context.textures.teleport, x*64, y*64);	
    if (isForwardAnimation) {
	   teleport.animation.add('idle', [ 0, 1, 2, 3 ], 0.3, true);
    } else {
       teleport.animation.add('idle', [ 3, 2, 1, 0 ], 0.3, true); 
    }
	teleport.animation.play('idle', true);
    teleport.type = 'teleport';
    teleport.affectedX = affectedX*64;
    teleport.affectedY = affectedY*64;
    context.redirectorGroup.addChild(teleport);
}

/**
 * Add pair of binded teleports
 */
function addTeleportPair(context, x, y, x2, y2) {
    addTeleport(context, x, y, x2, y2, true);
    addTeleport(context, x2, y2, x, y, false);
}