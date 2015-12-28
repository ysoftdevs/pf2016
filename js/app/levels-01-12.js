var level1 = {};
level1.create = function(context) {
    // Define start coordinates
    context.character.initialX = 2*64;
    context.character.initialY = 2*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 7*64;
    context.finishMarker.y = 2*64;

};

var level2 = {};
level2.create = function(context) {
    // Define start coordinates
    context.character.initialX = 4*64;
    context.character.initialY = 2*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 2*64;
    context.finishMarker.y = 2*64;

    // Create redirector objects
    addRedirector(context, 6, 1, -1, 0, 9);

};

var level3 = {};
level3.create = function(context) {
    // Create redirector objects
    addRedirector(context, 6, 3, 1, 0, 0);
    addRedirector(context, 4, 3, 0, -1, 3);
        
    // Define player coordinates
    context.character.x = 2*64 - 8;
    context.character.y = 64 - 8;
    context.character.physics.acceleration.x = 0;
    context.character.physics.maxVelocity.y = 140;
    
    // Define finish coordinates
    context.finishMarker.x = 6*64;
    context.finishMarker.y = 1*64;
};
    
var level4 = {};
level4.create = function(context) {
    // Define finish coordinates
    context.finishMarker.x = 8*64;
    context.finishMarker.y = 2*64;

    // Add teleports  
    addTeleportPair(context, 4, 3, 8, 3);

    // Create redirector objects
    addRedirector(context, 9, 1, -1, 0, 9);
    addRedirector(context, 5, 1, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);

};

var level5 = {};
level5.create = function(context) {
    // Define finish coordinates
    context.finishMarker.x = 8*64;
    context.finishMarker.y = 2*64;

    // Add teleports  
    addTeleportPair(context, 4, 2, 9, 2);

    // Create redirector objects
    addRedirector(context, 9, 1, -1, 0, 9);
    addRedirector(context, 9, 3, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);

};

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

};

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
};

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
    var laser = addLaser(context, 4, 1, 'down', true);
    var laser2 = addLaser(context, 4, 3, 'up', true);
    var laserBeam = addLaserBeam(context, 4, 2, 1, true);
    var laserSwitch = addSwitch(context, 2, 3, 0);
        
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
    
    var laserBeam2 = addLaserBeam(context, 8, 3, 1, true);
    var laserSwitch2 = addSwitch(context, 6, 3, 0);
    laserSwitch2.linkedItems = [laser3, laser4, laserBeam2];

    var laserSwitch3 = addSwitch(context, 5, 3, 0);
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
};

var level9 = {};
level9.create = function(context) {
    // Define start coordinates
    context.character.initialX = 11*64;
    context.character.initialY = 4*64;
    context.character.initialVelocityX = 0;
    context.character.initialVelocityY = -64;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 4*64;
 
    addTeleportPair(context, 9, 3, 2, 4 );
    addTeleportPair(context, 9, 2, 7, 4 );
    addTeleportPair(context, 9, 1, 7, 3 );
    addTeleportPair(context, 10, 4, 1, 2 );
    addTeleportPair(context, 3, 3, 5, 3 );
    addTeleportPair(context, 6, 2, 5, 4 );
 
    // Create redirector objects
    
    // Right
    addRedirector(context, 11, 3, 1, 0, 0);
    
    // Up
    addRedirector(context, 10, 1, 0, -1, 3);
    addRedirector(context, 5, 2, 0, -1, 3);
    
    // Left
    addRedirector(context, 10, 2, -1, 0 , 9);
    addRedirector(context, 10, 3, -1, 0 , 9);

};

var level10 = {};
level10.create = function(context) {
    // Define start coordinates
    context.character.initialX = 4*64;
    context.character.initialY = 4*64;
    context.character.initialVelocityX = 64;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 9*64;
    context.finishMarker.y = 1*64;
 
    // Right
    addRedirector(context, 5, 1, 1, 0, 0);
    addRedirector(context, 5, 2, 1, 0, 0);
    addRedirector(context, 5, 3, 1, 0, 0);
    addRedirector(context, 5, 4, 1, 0, 0);

    // Left    
    addRedirector(context, 6, 1, -1, 0, 9);
    addRedirector(context, 6, 2, -1, 0, 9);
    addRedirector(context, 6, 3, -1, 0, 9);
    addRedirector(context, 6, 4, -1, 0, 9);
    
    // Up
    addRedirector(context, 7, 1, 0, -1, 3);
    addRedirector(context, 7, 2, 0, -1, 3);
    addRedirector(context, 7, 3, 0, -1, 3);
    addRedirector(context, 7, 4, 0, -1, 3);
    
    // Down
    addRedirector(context, 8, 1, 0, 1, 6);
    addRedirector(context, 8, 2, 0, 1, 6);
    addRedirector(context, 8, 3, 0, 1, 6);
    addRedirector(context, 8, 4, 0, 1, 6);
};

var level11 = {};
level11.create = function(context) {
    // Define start coordinates
    context.character.initialX = 1*64;
    context.character.initialY = 4*64;
    context.character.initialVelocityX = 0;
    context.character.initialVelocityY = -64;
    
    // Define finish coordinates
    context.finishMarker.x = 11*64;
    context.finishMarker.y = 4*64;
    
    var laser = addLaser(context, 8, 3, 'down', false);
    var laser2 = addLaser(context, 8, 5, 'up', false);
    
    var laserSwitch = addSwitch(context, 1, 2, 2);
    var laserSwitch2 = addSwitch(context, 6, 2, 2);
    var laserBeam = addLaserBeam(context, 8, 4, 1, false);
    laserSwitch.linkedItems = [laser, laser2, laserSwitch2, laserBeam ];
    laserSwitch2.linkedItems = [laser, laser2, laserSwitch, laserBeam ];
    
    // Right
    addRedirector(context, 5, 1, 1, 0, 0);
    addRedirector(context, 5, 2, 1, 0, 0);
    addRedirector(context, 5, 3, 1, 0, 0);
    addRedirector(context, 5, 4, 1, 0, 0);
    addRedirector(context, 4, 4, 1, 0, 0);

    // Up
    addRedirector(context, 7, 1, 0, -1, 3);
    addRedirector(context, 7, 2, 0, -1, 3);
    
    // Down
    addRedirector(context, 7, 4, 0, 1, 6);
    addRedirector(context, 7, 3, 0, 1, 6);
    addRedirector(context, 3, 4, 0, 1, 6);
    
    // Left
    addRedirector(context, 8, 4, 0, -1, 9);
    addRedirector(context, 9, 4, 0, -1, 9);
};

var level12 = {};
level12.create = function(context) {
    // Define start coordinates
    context.character.initialX = 0*64;
    context.character.initialY = 5*64;
    context.character.initialVelocityX = 16;
    context.character.initialVelocityY = 0;
    
    // Define finish coordinates
    context.finishMarker.x = 12*64;
    context.finishMarker.y = 5*64;
    
    var laser = addLaser(context, 1, 4, 'up', false);
    
    var laserSwitch = addSwitch(context, 1, 5, 2);
    laserSwitch.linkedItems = [laser,
        addLaserBeam(context, 1, 3, 1, false),
        addLaserBeam(context, 1, 2, 2, false),
        addLaserBeam(context, 1, 1, 1, false), 
        addLaserBeam(context, 1, 0, 3, false),
        addLaserBeam(context, 2, 0, 4, false),
        addLaserBeam(context, 2, 1, 1, false),
        addLaserBeam(context, 2, 2, 5, false),
    ];
    
    var laser2 = addLaser(context, 4, 4, 'up', false);
    var laserSwitch2 = addSwitch(context, 4, 5, 2);
    laserSwitch2.linkedItems = [laser2,
        addLaserBeam(context, 4, 3, 1, false),
        addLaserBeam(context, 4, 2, 2, false),
        addLaserBeam(context, 4, 1, 1, false),
        addLaserBeam(context, 4, 0, 3, false),
        addLaserBeam(context, 5, 0, 0, false),
        addLaserBeam(context, 5, 2, 0, false),
        addLaserBeam(context, 6, 0, 1, false),
    ];
    
    var laser3 = addLaser(context, 8, 4, 'up', false);
    var laserSwitch3 = addSwitch(context, 8, 5, 2);
    laserSwitch3.linkedItems = [laser3,
        addLaserBeam(context, 8, 3, 1, false),
        addLaserBeam(context, 8, 2, 1, false),
        addLaserBeam(context, 8, 1, 6, false),
        addLaserBeam(context, 8, 0, 1, false),
        addLaserBeam(context, 7, 1, 0, false),
    ];
    
    var laser4 = addLaser(context, 10, 4, 'up', false);
    var laserSwitch4 = addSwitch(context, 10, 5, 2);
    laserSwitch4.linkedItems = [laser4,
        addLaserBeam(context, 10, 3, 1, false),
        addLaserBeam(context, 10, 2, 2, false),
        addLaserBeam(context, 10, 1, 1, false),
        addLaserBeam(context, 10, 0, 3, false),
        addLaserBeam(context, 11, 0, 0, false),        
        addLaserBeam(context, 11, 2, 0, false),
        addLaserBeam(context, 11, 4, 0, false),
        addLaserBeam(context, 12, 2, 4, false),
        addLaserBeam(context, 12, 3, 1, false),
        addLaserBeam(context, 12, 4, 5, false),        
    ];
};
