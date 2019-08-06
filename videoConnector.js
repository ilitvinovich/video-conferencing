const generatedToken = 'cHJvdmlzaW9uAGlnb3Jlazk2YnlAZ21haWwuY29tQDQxMDEzYi52aWR5by5pbwA2MzczMjM5MDkxMQAAMmU0MzA4NjRiMjJkMThlY2MzMjZkY2E5ZjA5OTg3OTM0YjBjNzJhY2FmNmNlMDNiY2RmODFhOGVjYmRlNDViYzQzMGVlMmY3YjFmYTczODNkMmQ1Y2ZiNzI5NGRmMjMw';

setTimeout(() => {
    /* JavaScript Example: */
    /* Assume that the DOM has a div with id="renderer" where the preview and the live conference should be rendered */
    /* After the VidyoClient is successfully initialized a global VC object will become available  */
    VC.CreateVidyoConnector({
        viewId: "renderer",                            // Div ID where the composited video will be rendered, see VidyoConnector.html
        viewStyle: "VIDYO_CONNECTORVIEWSTYLE_Default", // Visual style of the composited renderer
        remoteParticipants: 15,                        // Maximum number of participants
        logFileFilter: "warning all@VidyoConnector info@VidyoClient",
        logFileName: "",
        userData: ""
    }).then(function (vidyoConnector) {
        vidyoConnector.Connect({
            host: "prod.vidyo.io",
            token: 'cHJvdmlzaW9uAHVzZXIxQDQxMDEzYi52aWR5by5pbwA2MzczMjI5Mjk2NgAAZWQyMDdhODg2NGJkZTkzNGM3NWI2YTNlNGRlNjI2NWZkYzk5MmEyZjVkNjQwMzA1OWRhNDc2N2M2YWMwZmY1YjVmMzE3MDVlMTQ2N2M2NTNmOTAzOTJlNDA0NzAzNDg1',
            displayName: "John Smith",
            resourceId: "JohnSmithRoom",
            // Define handlers for connection events.
            onSuccess: function () {/* Connected */ },
            onFailure: function (reason) {/* Failed */ },
            onDisconnected: function (reason) {/* Disconnected */ }
        }).then(function (status) {
            if (status) {
                console.log("ConnectCall Success");
                registerParticipants();
                /* JavaScript Example: */
                vidyoConnector.CycleCamera();
                vidyoConnector.CycleMicrophone();
                vidyoConnector.CycleSpeaker();
            } else {
                console.error("ConnectCall Failed");
            }
        }).catch(function () {
            console.error("ConnectCall Failed");
        });
    }).catch(function () {
        console.error("CreateVidyoConnector Failed");
    });
}, 2000)


function registerParticipants() {
    /* JavaScript Example: */
    vidyoConnector.RegisterParticipantEventListener(
        {
            onJoined: function (participant) { /* Participant Joined */ },
            onLeft: function (participant) { /* Participant Left */ },
            onDynamicChanged: function (participants) { /* Ordered array of participants according to rank */ },
            onLoudestChanged: function (participant, audioOnly) { /* Current loudest speaker */ }
        }).then(function () {
            console.log("RegisterParticipantEventListener Success");
        }).catch(function () {
            console.err("RegisterParticipantEventListener Failed");
        });
}