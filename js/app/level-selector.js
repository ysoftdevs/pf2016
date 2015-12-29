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

        var button = new Kiwi.Plugins.Primitives.Rectangle( {
            x: 110+counterX*120,
            y: 50+counterY*70,
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
            var text = new Kiwi.GameObjects.Textfield( this, "\uf023", 100+counterX*120, 32+counterY*70, "#cb6f25", 32, 'normal', 'FontAwesome' );
            this.addChild(text);
        } else {
            var text = new Kiwi.GameObjects.Textfield( this, i.toString(), 100+counterX*120, 30+counterY*70, "#fbd712", 32, 'normal', 'Impact' );
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
	game.states.switchState('state');
}