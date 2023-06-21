({
    updateCapacity : function(component, configuredCapacity, newWorkload) {
        if (newWorkload >= configuredCapacity && !component.get('v.isAtCapacity'))
        {
            this.logToConsole("Setting at Capacity true");
            component.set('v.isAtCapacity', true);
        }
        else if (component.get('v.isAtCapacity'))
        {
            // No longer at capacity - flip flag
            this.logToConsole("Setting at Capacity false");
            component.set('v.isAtCapacity', false);
        }
    },

    updateBusy : function(component, channelValue) {
        this.logToConsole("channelValue: " + channelValue);
        this.logToConsole("channelValue.length: " + channelValue ? channelValue.length : "null");
        // ChannelValue will be an empty string for busy, otherwise will contain something if it's an available state
        if (channelValue && channelValue.length === 0 && !component.get('v.isBusy'))
        {
            this.logToConsole("Setting Busy true");
            component.set('v.isBusy', true);
        }
        else if (component.get('v.isBusy') && channelValue && channelValue.length > 0) {
            this.logToConsole("Setting Busy false");
            component.set('v.isBusy', false);
        }
    },

    updateFlagRaised : function(component, isFlagged) {
        if (isFlagged != component.get('v.flagRaised')) {
            // Set flagged state if not already matching
            this.logToConsole("Setting flagRaised to " + isFlagged);
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
        // Not used - this is the same as off though
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
        this.logToConsole("parameters: action:" + action + ", red:" + red + ", green:" + green + ", blue:" + blue);
        try 
        {   
            component.find('busyLightTestHttp').sendRequest(action,red,green,blue);
        }
        catch (err)
        {
            this.logToConsole("Error - " + err.message,true);
        }
        
    },

    logToConsole : function(whatToLog, isError) {
        if (true)
        {
            if (isError)
            {
                console.error("BusyLight: " + whatToLog);
            }
            else{
                console.log("BusyLight: " + whatToLog);
            }
            
        }
    },

    legacyCode : function()
    {
        const HOST = "http://localhost:8989/?";
        var requestURL;
        if (action)
        {
            requestURL = HOST + 'action=' + action;
        }
        else
        {
            console.error("BusyLight: No Action passed");
            return;
        }

        if (red && green && blue)
        {
            requestURL += '&red=' + red + '&green=' + green + '&blue=' + blue;
        }

        const Http = new XMLHttpRequest();
        Http.onreadystatechange = (e) => {
            this.logToConsole("BusyLight: " + Http.responseText)
        }
        //Http.send();

        // Deep pink: red=100&green=0&blue=23
        // Orange: red=100&green=10
    }


})
