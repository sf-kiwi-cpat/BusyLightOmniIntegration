({
    updateOffline : function(component, isOffline) {
        component.set('v.isOffline', isOffline);
        // Clear status of everything else - these will get reset on login
        if (isOffline) {
            component.set('v.workPendingAccept', false);
            component.set('v.isAtCapacity', false);
            component.set('v.isBusy', false);
            component.set('v.flagRaised', false);
        }
    },

    updateWorkPending : function(component, isWorkPending) {
        component.set('v.workPendingAccept', isWorkPending);
    },

    updateCapacity : function(component, configuredCapacity, newWorkload) {
        if (newWorkload >= configuredCapacity && !component.get('v.isAtCapacity'))
        {
            // Workload equal or greater than allowed capacity - so set at capacity true.
            this.logToConsole(component,"Setting at Capacity true");
            component.set('v.isAtCapacity', true);
        }
        else if (component.get('v.isAtCapacity'))
        {
            // No longer at capacity - flip flag
            this.logToConsole(component,"Setting at Capacity false");
            component.set('v.isAtCapacity', false);
        }
    },

    updateBusy : function(component, channelValue) {
        this.logToConsole(component,"channelValue: " + channelValue);
        this.logToConsole(component,"channelValue.length: " + channelValue ? channelValue.length : "null");
        // ChannelValue will be an empty string for busy, otherwise will contain something if it's an available state
        if (channelValue && channelValue.length === 0 && !component.get('v.isBusy'))
        {
            this.logToConsole(component,"Setting Busy true");
            component.set('v.isBusy', true);
        }
        else if (component.get('v.isBusy') && channelValue && channelValue.length > 0) {
            this.logToConsole(component,"Setting Busy false");
            component.set('v.isBusy', false);
        }
    },

    updateFlagRaised : function(component, isFlagged) {
        if (isFlagged != component.get('v.flagRaised')) {
            // Set flagged state if not already matching
            this.logToConsole(component,"Setting flagRaised to " + isFlagged);
            component.set('v.flagRaised', isFlagged);
        }
    },

    setLightAvailable : function(component) {
        this.updateLight(component, 'light', 0, 100, 0); // Green
    },

    setLightFlagRaised : function(component) {
        this.updateLight(component, 'pulse', 100 , 0, 0); // Red pulse
    },

    setLightWorkAssigned : function(component) {
        this.updateLight(component, 'pulse', 0, 0, 100); // Blue pulse
    },

    setLightIdle : function(component) {
        // Not used - this is the same as off though - would need to revise the colors to be used
        this.updateLight(component, 'light', 0, 0, 0);
    },

    setLightAtCapacity : function(component) {
        this.updateLight(component, 'light', 100, 89, 0); // yellow
    },

    setLightBusy : function(component) {
        this.updateLight(component, 'light', 100, 8, 0); // Orange
    },

    setLightOff : function(component) {
        this.updateLight(component, 'off');
    },

    resetLightState : function (component) {
        // Function that determines what state the light should be in
        if (component.get('v.isOffline'))
        {
            this.setLightOff(component);
        }
        else if (component.get('v.flagRaised'))
        {
            this.setLightFlagRaised(component);
        }
        else if (component.get('v.workPendingAccept'))
        {
            this.setLightWorkAssigned(component);
        }
        else if (component.get('v.isBusy'))
        {
            this.setLightBusy(component);
        }
        else if (component.get('v.isAtCapacity'))
        {
            this.setLightAtCapacity(component);
        }
        else {
            this.setLightAvailable(component);
        }
    },

    updateLight : function(component, action, red, green, blue) {
        // Function to call to the LWC component to make the https request to the light.
        this.logToConsole(component,"parameters: action:" + action + ", red:" + red + ", green:" + green + ", blue:" + blue);
        this.getRequest(component,action,red,green,blue);
    },

    getRequest : function(component, action, red, green, blue)
    {
        // Send the request to the localhost server with the passed parameters
        var parameters = 'action=' + action;
        if ((red >= 0 && red <= 100) && (green >= 0 && green <= 100) && (blue >= 0 && blue <= 100))
        {
            parameters += '&red=' + red + '&green=' + green + '&blue=' + blue;
        }

        const Http = new XMLHttpRequest();
        this.logToConsole(component,"parameters: " + parameters);
        try 
        {   
            Http.open("GET", 'http:////localhost:8989/?' + parameters);
            Http.onreadystatechange = (e) => {
                this.logToConsole(component,"Request Response: " + Http.responseText)
            }
            Http.send();
        }
        catch (err)
        {
            this.logToConsole(component,"Error - " + err.message,true);
        }
    },

    logToConsole : function(component, whatToLog, isError) {
        // Function to easily turn logging on and off when releasing
        if (component.get("v.enableConsoleLogging"))
        {
            if (isError)
            {
                console.error("BusyLight: " + whatToLog);
            }
            else{
                console.log("BusyLight: " + whatToLog);
            }
            
        }
    }

})
