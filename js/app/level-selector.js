var levelSelectorState = new Kiwi.State('levelSelector');

/**
 * Save status of locks.
 */
levelSelectorState.save = function() {
    this.game.saveManager.add('levelStatus', this.levelStatus);
    this.game.saveManager.save();
}

levelSelectorState.preload = function() {
    if (this.game.saveManager.exists('levelStatus')) {
        this.levelStatus = this.game.saveManager.getData('levelStatus');
    } else {
        this.levelStatus = ['unlocked', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked', 'locked',
            'locked', 'locked', 'locked'
        ];
        this.save();
    }        
}

levelSelectorState.create = function() {
    var counterX = 0;
    var counterY = 0;
    
    // Unlock next level when previous was completed
    if (game.levelStatus == 'complete') {
        if (game.levelIndex < 12) {
            this.levelStatus[game.levelIndex] = 'unlocked';
            game.levelStatus = 'none';
            this.save();
        }
    }

    this.addChild(new Kiwi.GameObjects.Textfield( this, "Puzzle Game", 200, 10, "#fbd712", 32, 'normal', 'Impact' ));
    var baseY = 90;
    // List of levels
	for (var i=1; i<levels.length+1; i++) {

        var button = new Kiwi.Plugins.Primitives.Rectangle( {
            x: 110+counterX*120,
            y: baseY+50+counterY*70,
            state: this,
            width: 100,
            height: 50,
            color: '2160e1',
            strokeColor: '050e20',
            centerOnTransform: true
        } );
        this.addChild(button);

		button.levelIndex = i;

		if (this.levelStatus[i-1] == 'locked') {
            var lock = new Kiwi.GameObjects.Sprite(this, this.textures.lock, 100+counterX*120, baseY+32+counterY*70);
            this.addChild(lock);
        } else {
            var text = new Kiwi.GameObjects.Textfield( this, i.toString(), 100+counterX*120, baseY+30+counterY*70, "#fbd712", 32, 'normal', 'Impact' );
            this.addChild(text);
            button.input.onUp.add( this.buttonReleased, this );	
        }
        
        counterX++;
        if (counterX > 3) {
            counterX = 0;
            counterY++;
        }
	}
}

levelSelectorState.buttonReleased = function(sprite) {
	game.levelIndex = sprite.levelIndex;
	game.states.switchState('instructionsState');
}