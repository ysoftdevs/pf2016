var levelSelectorState = new Kiwi.State('levelSelector');

levelSelectorState.preload = function() {
	this.addSpriteSheet('button', './data/images/gfx64/button.png', 128, 64 );
}

levelSelectorState.create = function() {
	for (var i=0; i!=2; i++) {
		var text = new Kiwi.GameObjects.Textfield( this, "Level " + (i+1).toString(), 66+i*140, 60, "#000", 32, 'normal', 'Impact' );
		var sprite = new Kiwi.GameObjects.Sprite(this, this.textures.button, 50+i*140, 50);
		sprite.levelIndex = i;
		sprite.input.onUp.add( this.buttonReleased, this );	
		this.addChild( sprite );
		this.addChild( text );
	}
}

levelSelectorState.buttonReleased = function(sprite) {
	game.levelIndex = sprite.levelIndex;
	game.states.switchState('state');
}