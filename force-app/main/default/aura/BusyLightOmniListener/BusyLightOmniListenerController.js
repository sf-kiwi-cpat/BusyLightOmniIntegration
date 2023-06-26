({
    loginError : function(component, event, helper) {
        helper.logToConsole(component,"loginError event received");
        //helper.logToConsole(component,"event.error:" + event.getParam('error'));
        helper.updateLight(component, 'blink', 100, 0, 0); // Red blinking
    },

    loginSuccess : function(component, event, helper) {
        helper.logToConsole(component,"loginSuccess event received");
        helper.updateOffline(component, false);
        helper.resetLightState(component);
    },

    logoutSuccess : function(component, event, helper) {
        helper.logToConsole(component,"logoutSuccess event received");
        //helper.logToConsole(component,"event.reason:" + event.getParam('reason'));
        helper.updateOffline(component, true);
        helper.resetLightState(component);
    },

    newWorkAssigned : function(component, event, helper) {
        helper.logToConsole(component,"newWorkAssigned event received");
        helper.updateWorkPending(component, true);
        helper.resetLightState(component);
    },

    workAccepted : function(component, event, helper) {
        helper.logToConsole(component,"workAccepted event received");
        helper.updateWorkPending(component, false);
        helper.resetLightState(component);
    },

    statusUpdate : function(component, event, helper) {
        helper.logToConsole(component,"statusUpdate event received");
        helper.logToConsole(component,"event.channels:" + event.getParam('channels'));
        //helper.logToConsole(component,"event.statusApiName:" + event.getParam('statusApiName'));
        //helper.logToConsole(component,"event.statusId:" + event.getParam('statusId'));
        //helper.logToConsole(component,"event.statusName:" + event.getParam('statusName'));
        helper.updateBusy(component,event.getParam('channels'));
        helper.resetLightState(component);
    },

    capacityUpdate : function(component, event, helper) {
        helper.logToConsole(component,"capacityUpdate event received");
        helper.logToConsole(component,"event.configuredCapacity:" + event.getParam('configuredCapacity'));
        helper.logToConsole(component,"event.newWorkload:" + event.getParam('newWorkload'));
        helper.logToConsole(component,"event.previousWorkload	:" + event.getParam('previousWorkload'));
        helper.updateCapacity(component, event.getParam('configuredCapacity'), event.getParam('newWorkload'));
        helper.resetLightState(component);
    },

    flagUpdated : function(component, event, helper) {
        helper.logToConsole(component,"flagUpdated event received");
        helper.logToConsole(component,"event.isFlagged:" + event.getParam('isFlagged'));
        //helper.logToConsole(component,"event.message:" + event.getParam('message'));
        //helper.logToConsole(component,"event.roleUpdatedBy:" + event.getParam('roleUpdatedBy'));
        //helper.logToConsole(component,"event.updatedBy:" + event.getParam('updatedBy'));
        helper.updateFlagRaised(component, event.getParam('isFlagged'));
        helper.resetLightState(component);
    }
})
