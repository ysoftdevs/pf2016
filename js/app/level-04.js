var level4 = {};
level4.create = function(context) {
    // Define finish coordinates
    context.finishMarker.x = 8*64;
    context.finishMarker.y = 2*64;

    // Add teleports  
    addTeleportPair(context, 4, 3, 8, 3);

    // Create redirector objects
    addRedirector(context, 9, 1, -1, 0, 9);
    addRedirector(context, 5, 1, 1, 0, 0);
    addRedirector(context, 10, 2, 0, -1, 3);

}