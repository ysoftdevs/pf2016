var levelSelectorState = new Kiwi.State('levelSelector');

/**
 * Save status of locks.
 */
levelSelectorState.save = function() {
    this.game.saveManager.add('levelStatus', this.levelStatus);
    this.game.saveManager.save();
}

levelSelectorState.preload = function() {
	this.addSpriteSheet('button', './data/images/gfx64/button.png', 128, 64 );
        
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

	for (var i=1; i<levels.length+1; i++) {

        var sprite = new Kiwi.GameObjects.Sprite(this, this.textures.button, 40+counterX*140, 50+counterY*80);
		sprite.levelIndex = i;
		this.addChild( sprite );

		if (this.levelStatus[i-1] == 'locked') {
            sprite.cellIndex = 1;
        } else {
            var text = new Kiwi.GameObjects.Textfield( this, i.toString(), 100+counterX*140, 60+counterY*80, "#1d5f0e", 32, 'normal', 'Impact' );
            this.addChild(text);
            sprite.input.onUp.add( this.buttonReleased, this );	
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
	game.states.switchState('state');
}