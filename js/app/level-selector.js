var levelSelectorState = new Kiwi.State('levelSelector');

levelSelectorState.preload = function() {
	this.addSpriteSheet('button', './data/images/gfx64/button.png', 128, 64 );
}

levelSelectorState.create = function() {
    var counterX = 0;
    var counterY = 0;
	for (var i=1; i<levels.length+1; i++) {

		var text = new Kiwi.GameObjects.Textfield( this, "Level " + i.toString(), 16+counterX*140, 60+counterY*80, "#000", 32, 'normal', 'Impact' );
		var sprite = new Kiwi.GameObjects.Sprite(this, this.textures.button, counterX*140, 50+counterY*80);
		sprite.levelIndex = i;
		sprite.input.onUp.add( this.buttonReleased, this );	
		this.addChild( sprite );
		this.addChild( text );
        
        counterX++;
        if (counterX > 4) {
            counterX = 0;
            counterY++;
        }
	}
}

levelSelectorState.buttonReleased = function(sprite) {
	game.levelIndex = sprite.levelIndex;
	game.states.switchState('state');
}