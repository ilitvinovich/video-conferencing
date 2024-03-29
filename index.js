function onVidyoClientLoaded(status) {
    switch (status.state) {
        case "READY":
            console.log('Application is ready');
            // The library is operating normally
            // After the VidyoClient/VidyoConnector is successfully initialized,
            // a global VC object will become available.
            //
            // Load the rest of the application here
            // ...
            break;
        case "RETRYING":     // The library operating is temporarily paused
            console.log('Application is RETRYING');
            break;
        case "FAILED":       // The library operating has stopped
            console.log('Application is FAILED');
            break;
        case "FAILEDVERSION":// The version of the Javascript library does not match the plugin
            status.plugInVersion; // The Version of the plugin currently installed
            status.jsVersion;     // The Version of the Javascript library loaded
            console.log('Application is FAILEDVERSION');
            break;
        case "NOTAVAILABLE": // The library is not available
            console.log('Application is NOTAVAILABLE');
            break;
    }
    status.downloadType;                       // Available download types with possible values of "MOBILE" "PLUGIN" "APP"
    status.downloadPathApp;                    // Path to the application installer for the app which could be invoked with a protocol handler
    status.downloadPathPlugIn;                 // Path to the Plugin that can be installed
    status.downloadPathWebRTCExtensionChrome;  // Path to the optional Chrome extension required for Screen Sharing in WebRTC
    status.downloadPathWebRTCExtensionFirefox; // Path to the optional Firefox extension required for Screen Sharing in WebRTC
    return true; // Return true to reload the plugins if not available
}
