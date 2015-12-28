var level5 = {};
level5.create = function(context) {
    // Define finish coordinates
    context.finishMarker.x = 8*64;
    context.finishMarker.y = 2*64;

    // Add teleports  
    addTeleportPair(context, 4, 2, 9, 2);

    // Create redirector objects
    addRedirector(context, 9, 1, -1, 0, 9);
    addRedirector(context, 9, 3, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);

}