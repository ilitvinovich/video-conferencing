const generatedToken = 'cHJvdmlzaW9uAGlnb3JANDEwMTNiLnZpZHlvLmlvADYzNzMyMjk4NzYxAAAwNWE1MmQxN2QxZGNhOWM2OWRiZjA1ZDhjOWU2NWM4Zjc5NTU4YTc3OGU1ZWFkNDlmYTY4NGRhNzVhYzA0NGU2ZDFiZWYyMDQ0NmM3YzA2MmI5MmM5Mjc1OGIxMzBkODA=';

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
            token: generatedToken,
            displayName: "John Smith",
            resourceId: "JohnSmithRoom",
            // Define handlers for connection events.
            onSuccess: function () {console.log('You are connected!') },
            onFailure: function (reason) {console.log('Your connection failed')},
            onDisconnected: function (reason) {console.log('You are disconnected!') }
        }).then(function (status) {
            if (status) {
                console.log("ConnectCall Success");
                registerParticipants(vidyoConnector);
                /* JavaScript Example: */
                vidyoConnector.CycleCamera();
                vidyoConnector.CycleMicrophone();
                vidyoConnector.CycleSpeaker();
                ShowRenderer(vidyoConnector);
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


function registerParticipants(vidyoConnector) {
    /* JavaScript Example: */
    vidyoConnector.RegisterParticipantEventListener(
        {
            onJoined: function (participant) { console.log('Participant has joined!')},
            onLeft: function (participant) { console.log('Participant has left!') },
            onDynamicChanged: function (participants) { /* Ordered array of participants according to rank */ },
            onLoudestChanged: function (participant, audioOnly) { /* Current loudest speaker */ }
        }).then(function () {
            console.log("RegisterParticipantEventListener Success");
        }).catch(function () {
            console.err("RegisterParticipantEventListener Failed");
        });
}

function ShowRenderer(vidyoConnector) {
    var rndr = document.getElementById('renderer');
    vidyoConnector.ShowViewAt({viewId: "renderer", x: rndr.offsetLeft, y: rndr.offsetTop, width: rndr.offsetWidth, height: rndr.offsetHeight});
}