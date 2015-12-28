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

/**
 * Add switch
 */
function addSwitch(context, x, y, cellIndex) {
    var laserSwitch = new Kiwi.GameObjects.Sprite(context, context.textures.switch, x*64, y*64);
    laserSwitch.cellIndex = cellIndex;
    laserSwitch.initialCellIndex = cellIndex;
    laserSwitch.type = 'switch';    
    context.redirectorGroup.addChild(laserSwitch);
    return laserSwitch;
}

/**
 * Add laser
 */
function addLaser(context, x, y, direction, isBurning) {
    var laser = new Kiwi.GameObjects.Sprite(context, context.textures.laser, x*64, y*64);
    
    if (direction == 'up') {
        laser.animation.add('idle', [ 0, 4, 8, 4 ], 0.4, true);	
	    laser.animation.add('burning', [ 0, 4, 8, 12, 16, 20, 24, 28, 32 ], 0.2, true);
    } else {
        laser.animation.add('idle', [ 2, 6, 10, 6 ], 0.4, true);	
        laser.animation.add('burning', [ 2, 6, 10, 14, 18, 22, 26, 30, 34 ], 0.2, true);
    }
    
    if (isBurning) {
       laser.initialAnimation = 'burning';
    } else {
       laser.initialAnimation = 'idle';
    }
    laser.animation.play(laser.initialAnimation, true);
    laser.type = 'laser';
    context.redirectorGroup.addChild(laser);
    return laser;
}

/**
 * Add laser beam
 */
function addLaserBeam(context, x, y, cellIndex, isBurning) {
    var laserBeam = new Kiwi.GameObjects.Sprite(context, context.textures.laserBeam, x*64, y*64);
    laserBeam.cellIndex = cellIndex;
    laserBeam.initialVisible = isBurning;
    laserBeam.visible = isBurning;
    laserBeam.type = 'laserBeam';
    context.redirectorGroup.addChild(laserBeam);
    return laserBeam;
}