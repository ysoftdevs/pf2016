var instructionsState = new Kiwi.State('instructionsState');

instructionsState.addContainer = function() {
    var messageBox = new Kiwi.Plugins.Primitives.Rectangle( {
        x: 3*64,
        y: 72,
        alpha: 0.5,
        state: this,
        width: 320,
        height: 200,
        color: '189608',
        strokeColor: 'fbd712',
        centerOnTransform: false
    } );
    
    this.addChild(messageBox);
    
    var baseY=180;
    var button = new Kiwi.Plugins.Primitives.Rectangle( {
        x: 350,
        y: baseY+50,
        state: this,
        width: 170,
        height: 50,
        color: '2160e1',
        strokeColor: '050e20',
        centerOnTransform: true
    } );
    this.addChild(button);
    
    var text = new Kiwi.GameObjects.Textfield( this, "Play", 320, baseY+30, "#fbd712", 32, 'normal', 'Impact' );
    this.addChild(text);
    button.input.onUp.add( this.buttonReleased, this );	 
}

instructionsState.playMotion = function() {
    this.character.physics.velocity.x = 10;
    this.timer.clear();
    this.timer = this.game.time.clock.createTimer('time', 2, 1, true);
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.startTouch, this );
}

instructionsState.startTouch = function() {
    this.character.x = 290;
    this.character.physics.velocity.x = 0;
    this.touch.animation.play('click', true);

    this.timer = this.game.time.clock.createTimer('time', 2, 1, true);
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.playMotion, this );    
}

instructionsState.touchBall = function() {
    this.addContainer();

    this.character = new Kiwi.GameObjects.Sprite(this, this.textures.character, 280, 90);
    this.character.box.hitbox = new Kiwi.Geom.Rectangle( 12, 12, 58, 58 );
    this.character.physics = this.character.components.add( new Kiwi.Components.ArcadePhysics( this.character, this.character.box ) );

    this.touch = new Kiwi.GameObjects.Sprite(this, this.textures.base, 290, 120);
    this.touch.cellIndex = 33; 
    this.touch.animation.add('click', [ 34, 33, 34 ], 1, false);

    this.addChild(this.character);
    this.addChild(this.touch);    

    this.startTouch();
}

instructionsState.stopDrag = function() {
    this.touch.physics.velocity.x = 0;
    this.box.x += 64;  
    
    this.timer.clear();
    this.timer = this.game.time.clock.createTimer('time', 2, 1, true);
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.startDrag, this );    
}

instructionsState.startDrag = function() {
    this.touch.animation.play('drag');   
    
    this.box.x = 280;
    this.touch.x = 270;
    this.touch.physics.velocity.x = 8;
    
    this.timer.clear();
    this.timer = this.game.time.clock.createTimer('time', 2, 1, true);
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.stopDrag, this );        
}

instructionsState.moveBox = function() {
    this.addContainer();
    
    this.touch = new Kiwi.GameObjects.Sprite(this, this.textures.base, 270, 120);
    this.touch.cellIndex = 33; 
    this.touch.animation.add('drag', [ 33, 33, 33, 34 ], 1, false);
    this.touch.box.hitbox = new Kiwi.Geom.Rectangle( 12, 12, 58, 58 );
    
    
    this.box = new Kiwi.GameObjects.Sprite(this, this.textures.oneWay, 280, 90);
    this.box.cellIndex = 3;
    this.touch.physics = this.touch.components.add( new Kiwi.Components.ArcadePhysics( this.touch, null) );

    this.addChild(this.box);
    this.addChild(this.touch);
    
    this.timer = this.game.time.clock.createTimer('time', 2, 1, true);
    this.timer.createTimerEvent( Kiwi.Time.TimerEvent.TIMER_STOP, this.startDrag, this);
}


instructionsState.create = function() {
    if (game.levelIndex == 1) {
        this.touchBall();
    } else if (game.levelIndex == 2) {
        this.moveBox();
    } else {
        game.states.switchState('state');
    }
}

instructionsState.buttonReleased = function() { 
    if (this.timer) {
        this.timer.stop();
        this.timer.clear();
    }

	game.states.switchState('state');
}