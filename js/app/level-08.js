var level8 = {};
level8.create = function(context) {
    // Define start coordinates
    context.character.initialX = 1*64;
    context.character.initialY = 2*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 11*64;
    context.finishMarker.y = 4*64;
 
 
    // Laser
    var laser = new Kiwi.GameObjects.Sprite(context, context.textures.laser, 4*64, 1*64);
    laser.animation.add('idle', [ 2, 6, 10, 6 ], 0.4, true);	
	laser.animation.add('burning', [ 2, 6, 10, 14, 18, 22, 26, 30, 34 ], 0.2, true);
	laser.animation.play('burning', true);
    laser.initialAnimation = 'burning';
    laser.type = 'laser';
    context.redirectorGroup.addChild(laser);
    
    var laser2 = new Kiwi.GameObjects.Sprite(context, context.textures.laser, 4*64, 3*64);
    laser2.animation.add('idle', [ 0, 4, 8, 4 ], 0.4, true);	
	laser2.animation.add('burning', [ 0, 4, 8, 12, 16, 20, 24, 28, 32 ], 0.2, true);
	laser2.animation.play('burning', true);
    laser2.initialAnimation = 'burning';
    laser2.type = 'laser';
    context.redirectorGroup.addChild(laser2);
    
    var laserBeam = new Kiwi.GameObjects.Sprite(context, context.textures.laserBeam, 4*64, 2*64);
    laserBeam.cellIndex = 1;
    laserBeam.initialVisible = true;
    laserBeam.type = 'laserBeam';
    context.redirectorGroup.addChild(laserBeam);
    
    var laserSwitch = new Kiwi.GameObjects.Sprite(context, context.textures.switch, 2*64, 3*64);
    laserSwitch.cellIndex = 0;
    laserSwitch.initialCellIndex = 0;
    laserSwitch.type = 'switch';    
    context.redirectorGroup.addChild(laserSwitch);
        
    // Laser
    var laser3 = new Kiwi.GameObjects.Sprite(context, context.textures.laser, 8*64, 2*64);
    laser3.animation.add('idle', [ 2, 6, 10, 6 ], 0.4, true);	
	laser3.animation.add('burning', [ 2, 6, 10, 14, 18, 22, 26, 30, 34 ], 0.25, true);
	laser3.animation.play('burning', true);
    laser3.initialAnimation = 'burning';
    laser3.type = 'laser';
    context.redirectorGroup.addChild(laser3);
    
    var laser4 = new Kiwi.GameObjects.Sprite(context, context.textures.laser, 8*64, 4*64);
    laser4.animation.add('idle', [ 0, 4, 8, 4 ], 0.4, true);	
	laser4.animation.add('burning', [ 0, 4, 8, 12, 16, 20, 24, 28, 32 ], 0.25, true);
	laser4.animation.play('burning', true);
    laser4.initialAnimation = 'burning';
    laser4.type = 'laser';
    context.redirectorGroup.addChild(laser4);
    
    var laserBeam2 = new Kiwi.GameObjects.Sprite(context, context.textures.laserBeam, 8*64, 3*64);
    laserBeam2.cellIndex = 1;
    laserBeam2.initialVisible=true;
    laserBeam2.type = 'laserBeam';
    context.redirectorGroup.addChild(laserBeam2);
    
    var laserSwitch2 = new Kiwi.GameObjects.Sprite(context, context.textures.switch, 6*64, 3*64);
    laserSwitch2.cellIndex = 0;
    laserSwitch2.initialCellIndex = 0;
    laserSwitch2.type = 'switch';
    laserSwitch2.linkedItems = [laser3, laser4, laserBeam2];
    context.redirectorGroup.addChild(laserSwitch2);

    var laserSwitch3 = new Kiwi.GameObjects.Sprite(context, context.textures.switch, 5*64, 3*64);
    laserSwitch3.cellIndex = 0;
    laserSwitch3.initialCellIndex = 0;
    laserSwitch3.type = 'switch';
    laserSwitch3.linkedItems = [laser, laser2, laserBeam, laserSwitch];
    context.redirectorGroup.addChild(laserSwitch3);
 
    // Link 1st switch
    laserSwitch.linkedItems = [laser, laser2, laserBeam, laserSwitch3];
 
    // Create redirector objects
    
    // Right
    addRedirector(context, 11, 3, 1, 0, 0);
    addRedirector(context, 11, 2, 1, 0, 0);
    addRedirector(context, 11, 1, 1, 0, 0);
    addRedirector(context, 9, 3, 1, 0, 0);
    
    // Down
    addRedirector(context, 10, 3, 0, 1, 6);
    addRedirector(context, 10, 1, 0, 1, 6);
    addRedirector(context, 9, 1, 0, 1, 6);
    
    // Up
    addRedirector(context, 10, 2, 0, -1, 3);
    addRedirector(context, 9, 2, 0, -1, 3);
    

}