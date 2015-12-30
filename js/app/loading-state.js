var loadingState = new Kiwi.State('loadingState');

loadingState.preload = function() {
    Kiwi.State.prototype.preload.call( this );
    
    this.addJSON('level1', 'data/levels/level-01.json');
    this.addJSON('level2', 'data/levels/level-02.json');
    this.addJSON('level3', 'data/levels/level-03.json');
    this.addJSON('level4', 'data/levels/level-04.json');
    this.addJSON('level5', 'data/levels/level-05.json');
    this.addJSON('level6', 'data/levels/level-06.json');
    this.addJSON('level7', 'data/levels/level-07.json');
    this.addJSON('level8', 'data/levels/level-08.json');
    this.addJSON('level9', 'data/levels/level-09.json');
    this.addJSON('level10', 'data/levels/level-10.json');
    this.addJSON('level11', 'data/levels/level-11.json');
    this.addJSON('level12', 'data/levels/level-12.json');
    this.addImage('lock', './data/images/gfx32/lock.png');
    this.addSpriteSheet('base', './data/images/gfx64/tiles.png', 64, 64);
    this.addSpriteSheet('character', './data/images/gfx64/marble_black.png', 80, 80 );
    this.addSpriteSheet('oneWay', './data/images/gfx64/st_oneway.png', 64, 64 );
    this.addSpriteSheet('finishMarker', './data/images/gfx64/finish_marker.png', 64, 64 );
    this.addSpriteSheet('teleport', './data/images/gfx64/st_spitter_idle.png', 64, 64);
    this.addSpriteSheet('box', './data/images/gfx64/st_box_wood.png', 64, 64);
    this.addSpriteSheet('switch', './data/images/gfx64/st_switch.png', 64, 64);
    this.addSpriteSheet('laserBeam', './data/images/gfx64/it_laser.png', 64, 64);
    this.addSpriteSheet('laser', './data/images/gfx64/st_laser.png', 64, 64);
}

loadingState.create = function(){
    var text = new Kiwi.GameObjects.Textfield( this, "Loading...", 100, 100, "#fbd712", 32, 'normal', 'Impact' );
    this.addChild(text);
    Kiwi.State.prototype.create.call( this);

    this.game.states.switchState( "levelSelector" );
}