/**
 * Register new redirector
 */
function addRedirector(context, x, y, vectorX, vectorY, imageIndex) {
    var redirector = new Kiwi.GameObjects.Sprite(context, context.textures.oneWay, x*64, y*64); 
    redirector.type = 'vector';
    redirector.affectVelocityX = context.velocityX * vectorX;
    redirector.affectVelocityY = context.velocityY * vectorY;
    redirector.cellIndex = imageIndex;
    redirector.input.enableDrag(true);
    redirector.input.onDragStarted.add(context.startedDrag, context);
    redirector.input.onDragStopped.add(context.stoppedDrag, context );

    context.redirectorGroup.addChild(redirector);
}
