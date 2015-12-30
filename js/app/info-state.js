var infoState = new Kiwi.State('infoState');

infoState.create = function() {
      var messageBox = new Kiwi.Plugins.Primitives.Rectangle( {
        x: 64,
        y: 72,
        alpha: 0.5,
        state: this,
        width: 460,
        height: 300,
        color: '189608',
        strokeColor: 'fbd712',
        centerOnTransform: false
    } );
    
    this.addChild(messageBox);
    
    var baseY=280;
    var button = new Kiwi.Plugins.Primitives.Rectangle( {
        x: 300,
        y: baseY+50,
        state: this,
        width: 160,
        height: 50,
        color: '2160e1',
        strokeColor: '050e20',
        centerOnTransform: true
    } );
    this.addChild(button);
    
    var georgikButton = new Kiwi.Plugins.Primitives.Rectangle( {
        x: 180,
        y: 180,
        state: this,
        width: 300,
        height: 32,
        color: '2160e1',
        strokeColor: '050e20',
        centerOnTransform: false,
        alpha: 0
    } );
    this.addChild(georgikButton);
    
    var text = new Kiwi.GameObjects.Textfield( this, "Ok", 285, baseY+30, "#fbd712", 32, 'normal', 'Impact' );
    this.addChild(text);
    
    this.addChild(new Kiwi.GameObjects.Textfield( this, "PF 2016 - Puzzle Game", 120, 100, "#fbd712", 32, 'normal', 'Impact' ));
    this.addChild(new Kiwi.GameObjects.Textfield( this, "Author: Juraj Michálek", 120, 150, "#fbd712", 23, 'normal', 'Impact' ));
    var georgikLink = new Kiwi.GameObjects.Textfield( this, "http://georgik.sinusgear.com", 180, 180, "#fbd712", 23, 'normal', 'Impact' );
    this.addChild(georgikLink);
    this.addChild(new Kiwi.GameObjects.Textfield( this, "Technologies: Kiwi.JS, FontAwesome, ", 120, 220, "#fbd712", 23, 'normal', 'Impact' ));
    this.addChild(new Kiwi.GameObjects.Textfield( this, "Enigma, Visual Studio Code, Linux", 180, 250, "#fbd712", 23, 'normal', 'Impact' ));
    button.input.onUp.add(this.buttonReleased, this);
    georgikButton.input.onUp.add(this.linkReleased, this);	 
}

infoState.buttonReleased = function() { 
	game.states.switchState('levelSelector');
}

infoState.linkReleased = function() {
    window.location.href = "http://georgik.sinusgear.com";
}