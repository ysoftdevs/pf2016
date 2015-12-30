var state = new Kiwi.State('state');

state.velocityX = 64;
state.velocityY = 64;

state.create = function() {
    var level = levels[this.game.levelIndex - 1];
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'level' + this.game.levelIndex.toString(), this.textures.base);
    
    this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 0, 0);
    this.character.initialX = 2*64;
    this.character.initialY = 64;
    this.character.initialVelocityX = 0;
    this.character.initialVelocityY = this.velocityY;
    // Hitbox is detecting collision in future step.
    // This is little bit counter intuitive. 
    // You have to make collision box smaller at least one step.    
    this.character.box.hitbox = new Kiwi.Geom.Rectangle( 12, 12, 58, 58 );
    this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );

    this.character.animation.add('walking', [ 0, 1 ], 0.2, true);
    this.character.animation.add('idle', [ 2, 3, 4, 5, 6, 5, 4, 3 ], 0.2, true);
    this.character.animation.add('failed', [ 11, 10, 9, 8, 7, 8, 9, 10], 0.2, true);

    this.redirectorGroup = new Kiwi.Group( this );
        
    this.finishMarker = new Kiwi.GameObjects.Sprite(this, this.textures.finishMarker, 6*64, 4*64);  
    this.finishMarker.animation.add('idle', [ 0, 1, 2, 3, 2, 1 ], 0.3, true);
    this.finishMarker.animation.play('idle', true);

    // Ground layer
    this.addChild(this.tilemap.layers[0]);

    // Load level specific data
    level.create(this);
    
    // Fix character coordinates and speed
    this.resetCharacter();

    this.addChild(this.finishMarker);

    // Walls layer
    this.addChild(this.tilemap.layers[1]);
    
    // Add action objects
    this.addChild(this.redirectorGroup);

    this.addChild(this.character);

    // Sky layer
    this.addChild(this.tilemap.layers[2]);
    
    this.backButton = new Kiwi.GameObjects.Sprite(this, this.textures.base, 0, 0);
    this.backButton.cellIndex = 24;
    this.backButton.input.onUp.add(this.backButtonReleased, this);
    this.addChild(this.backButton);

    // Create collision layer
    for(var i = 21; i < this.tilemap.tileTypes.length; i++) {
        this.tilemap.tileTypes[i].allowCollisions = Kiwi.Components.ArcadePhysics.ANY;
    }
        
    this.keyboard = this.game.input.keyboard;

    this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);
    this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);
    //Prevent the down key from scrolling the page
    this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN, true);
    
    this.stageState = 'init';
        
    this.character.input.onUp.add( this.buttonReleased, this );
}

state.backButtonReleased = function(sprite, mouse) {
    if ((mouse.x > 48) && (mouse.y > 48)) {
        return;
    }
    this.stageState == 'none'
    game.states.switchState('levelSelector');
}

state.buttonReleased = function(sprite) {   
    if (this.stageState == 'init') {
        this.activateScene();
    } else if (this.stageState == 'stop') {
        this.resetStage();
        this.stageState = 'init';
    } else if (this.stageState == 'complete') {
        game.levelStatus = 'complete';
        game.states.switchState('levelSelector');
    }
}

state.resetCharacter = function () {
    this.character.physics.velocity.x = 0;
    this.character.physics.velocity.y = 0;
    this.character.x = this.character.initialX - 8;
    this.character.y = this.character.initialY - 8;
}

/**
 * Reset all objects that should be back in the original position.
 * Dragable redirectors are left on original place.
 */
state.resetStage = function() {
    this.resetCharacter();
    var redirectors = this.redirectorGroup.members;
    for ( var i = 0; i < redirectors.length; i++ ) {
        var redirector = redirectors[i];
        if (redirector.type == 'box') {
            redirector.x = redirector.initialX;
            redirector.y = redirector.initialY;
        } else if (redirector.type == 'switch') {
            redirector.cellIndex = redirector.initialCellIndex;
        } else if (redirector.type == 'laserBeam') {
            redirector.visible = redirector.initialVisible;
        } else if (redirector.type == 'laser') {
            redirector.animation.play(redirector.initialAnimation, true);
        }
    }
}

state.startedDrag = function(sprite) {
    sprite.formerX = sprite.x;
    sprite.formerY = sprite.y;   
}

/**
 * Reverse effect of drag operaion. Set original coordinates.
 */
state.resetDrag = function(sprite) {
    sprite.x = sprite.formerX;
    sprite.y = sprite.formerY;
}

/**
 * Get tile index from specified coordinates.
 */
state.getTileIndex = function(x, y) {
    var tile = this.tilemap.layers[0].getTileFromXY(x / 64 , y / 64);
    if (tile == null) {
        return 0;
    }
    return tile.index;
}

/**
 * Perform adjustments of coordinates for drop operation.
 * Make sure that object is dropped on valid place and check
 * collision with other objects. In case of failure revert
 * to former coordinates.
 */
state.stoppedDrag = function(sprite) {
    if (sprite.x % 64 > 32) {
        sprite.x += 64;
    }
    if (sprite.y % 64 > 32) {
        sprite.y += 64;
    }
    sprite.x = sprite.x - sprite.x % 64;
    sprite.y = sprite.y - sprite.y % 64;
    
    // Make sure that we drop tile only on valid ground
    if (this.getTileIndex(sprite.x, sprite.y) == 0) {
        this.resetDrag(sprite);
    } else {
        // Make sure that we are not dropping on another redirector object
        var redirectors = this.redirectorGroup.members;
        for ( var i = 0; i < redirectors.length; i++ ) {
            var redirector = redirectors[i];
            
            // Skip comparision of self
            if (sprite === redirector) {
                continue;
            }
            
            if ((sprite.x == redirector.x) && (sprite.y == redirector.y)) {
                this.resetDrag(sprite);
                break;
            }
        }
    }
}

state.activateScene = function () {
    this.character.physics.velocity.x = this.character.initialVelocityX;
    this.character.physics.velocity.y = this.character.initialVelocityY;
    this.stageState = 'running';
}

state.update = function () {
    //Update all the gameobjects
    Kiwi.State.prototype.update.call(this);

    //Update physics
    this.checkCollision();

    this.updateCharacterAnimation();
}

state.updateCharacterAnimation = function () {
    
    if(( this.character.physics.velocity.y != 0 ) || (this.character.physics.velocity.x != 0)) {
        this.character.animation.play('walking', false);
    } else {
        if (this.stageState == 'stop') {
            this.character.animation.play('failed', false); 
        } else {
            this.character.animation.play('idle', false);
        }
    }
}

state.turnOff = function(items) {
    for (var i=0; i!=items.length; i++) {
        var item = items[i];
        if (item.type == 'laserBeam') {
            item.visible = false;
        } else if (item.type == 'switch') {
            item.cellIndex = 2;
        } else {
            item.animation.play('idle');
        }
    }
}

state.turnOn = function(items) {
    for (var i=0; i!=items.length; i++) {
        var item = items[i];
        if (item.type == 'laserBeam') {
            item.visible = true;
        } else if (item.type == 'switch') {
            item.cellIndex = 0;        
        } else {
            item.animation.play('burning');
        }
    }
}

/**
 * Create effect based on type of redirector.
 */
state.applyRedirectorMechanics = function(tileX, tileY, redirector) {
    var isRecalculationRequired = false;
    var redirectorTileX = Math.round(redirector.x/64);
    var redirectorTileY = Math.round(redirector.y/64);
    
    // Box has hit regions around. Compute based on vector of player
    if (redirector.type == 'box') {
        tileX+=this.character.physics.velocity.x/64;
        tileY+=this.character.physics.velocity.y/64;
    } 

    // Check for hit
    if ((tileX != redirectorTileX ) || (tileY != redirectorTileY)) {
        return;
    }
    
    if (redirector.type == 'vector') {
        this.character.physics.velocity.x = redirector.affectVelocityX;
        this.character.physics.velocity.y = redirector.affectVelocityY;
    } else if (redirector.type == 'teleport') {
        this.character.x = redirector.affectedX - 8;
        this.character.y = redirector.affectedY - 8;
    } else if (redirector.type == 'box') {
        // Move tile when it is possible
        if (this.getTileIndex(redirector.x + this.character.physics.velocity.x, redirector.y + this.character.physics.velocity.y) != 0) {
            redirector.x += this.character.physics.velocity.x;
            redirector.y += this.character.physics.velocity.y;
        }
        // Bounce
        this.character.physics.velocity.x = -this.character.physics.velocity.x;
        this.character.physics.velocity.y = -this.character.physics.velocity.y;
        
        // Bounce from box should relaunch direction calculation
        // This is for the case when box lies close to redirector 
        isRecalculationRequired = true;                
    } else if (redirector.type == 'switch') {
        // Flip the switch
        if (redirector.cellIndex == 0) {
            redirector.cellIndex = 2;
            this.turnOff(redirector.linkedItems);
        } else {
            redirector.cellIndex = 0;
            this.turnOn(redirector.linkedItems);
        }
    } else if (redirector.type == 'laserBeam') {
        if (redirector.visible) {
            this.character.physics.velocity.x = 0;
            this.character.physics.velocity.y = 0;
        }
    }
    
    // Correction of coordinates
    this.character.y = Math.round(this.character.y);
    this.character.x = Math.round(this.character.x);
    return isRecalculationRequired;
}

/**
 * Resolve collisions between the character and the first layer.
 */ 
state.checkCollision = function () {
    this.tilemap.layers[1].physics.overlapsTiles( this.character, true );
    
    if ((this.character.physics.velocity.x == 0) && (this.character.physics.velocity.y == 0)) {
        if (this.stageState == 'running') {
            this.stageState = 'stop';
        }
        return;
    }

    // Make collision detection only when ball is fully on the same tile
    var positionX = Math.round(this.character.x) + 8;
    var positionY = Math.round(this.character.y) + 8;
    if ((Math.round(positionX) % 64 != 0) || (Math.round(positionY)% 64 != 0)) {
        return;
    }

    var isRecalculationRequired = false;
    var redirectors = this.redirectorGroup.members;
    for ( var i = 0; i < redirectors.length; i++ ) {
        if (this.applyRedirectorMechanics(Math.round(positionX/64), Math.round(positionY/64), redirectors[i])) {
            isRecalculationRequired = true;
        }
    } 
    
    // Make the second round of calculation in case of hit of box
    if (isRecalculationRequired) {
        for ( var i = 0; i < redirectors.length; i++ ) {
            this.applyRedirectorMechanics(Math.round(positionX/64), Math.round(positionY/64), redirectors[i]);
        } 
    }
        
    if (((Math.round(positionX/64) == Math.round(this.finishMarker.x/64) )) && (Math.round(positionY/64) == Math.round(this.finishMarker.y/64))) {
        this.stageComplete();
    }

}

state.displayCongratulation = function() {
    var message = "Next";
    var messageWidth = 100;
    if (this.game.levelIndex == 12) {
        message = "PF 2016";
        messageWidth = 134;
    }

    var messageBox = new Kiwi.Plugins.Primitives.Rectangle( {
            x: 3*64,
            y: 72,
            alpha: 0.5,
            state: this,
            width: 320,
            height: 200,
            color: '063500',
            strokeColor: '050e20',
            centerOnTransform: false
        } );        
        
    var nextButton = new Kiwi.Plugins.Primitives.Rectangle( {
            x: 5*64,
            y: 200,
            alpha: 0.5,
            state: this,
            width: messageWidth,
            height: 50,
            color: '2160e1',
            strokeColor: '050e20',
            centerOnTransform: false
        } );
    var congratulationText = new Kiwi.GameObjects.Textfield( this, "Congratulations", 4*64, 100, "#fbd712", 32, 'normal', 'Impact' );
    var nextButtonText = new Kiwi.GameObjects.Textfield( this, message, 5*64+16, 204, "#fbd712", 32, 'normal', 'Impact' );
    nextButton.input.onUp.add( this.buttonReleased, this );    

    this.addChild(messageBox);
    this.addChild(congratulationText)
    this.addChild(nextButton);
    this.addChild(nextButtonText);
}

state.stageComplete = function() {
    this.stageState = 'complete';
    
    this.timer = this.game.time.clock.createTimer('time', 1, 1, true);

    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.displayCongratulation, this );

    this.character.physics.velocity.x = 0;
    this.character.physics.velocity.y = 0;
}
