({
   
    loginError : function(component, event, helper) {
        helper.logToConsole("loginError");
        helper.updateLight(component, 'blink', 100, 0, 0); // Red blinking
    },

    loginSuccess : function(component, event, helper) {
        helper.logToConsole("loginSuccess");
        component.set('v.isOffline', false);
        helper.resetLightState(component);
    },

    logoutSuccess : function(component, event, helper) {
        helper.logToConsole("logoutSuccess");
        component.set('v.isOffline', true);
        helper.resetLightState(component);
    },

    newWorkAssigned : function(component, event, helper) {
        helper.logToConsole("newWorkAssigned");
        component.set('v.workPendingAccept', true);
        helper.resetLightState(component);
    },

    workAccepted : function(component, event, helper) {
        helper.logToConsole("workAccepted");
        component.set('v.workPendingAccept', false);
        helper.resetLightState(component);
    },

    statusUpdate : function(component, event, helper) {
        helper.logToConsole("statusUpdate event received");
        helper.logToConsole("event.channels:" + event.getParam('channels'));
        helper.logToConsole("event.statusApiName:" + event.getParam('statusApiName'));
        helper.logToConsole("event.statusId:" + event.getParam('statusId'));
        helper.logToConsole("event.statusName:" + event.getParam('statusName'));
        helper.updateBusy(component,event.getParam('channels'));
        helper.resetLightState(component);
    },

    capacityUpdate : function(component, event, helper) {
        helper.logToConsole("capacityUpdate");
        helper.logToConsole("event.configuredCapacity:" + event.getParam('configuredCapacity'));
        helper.logToConsole("event.newWorkload:" + event.getParam('newWorkload'));
        helper.logToConsole("event.previousWorkload	:" + event.getParam('previousWorkload'));
        helper.updateCapacity(component, event.getParam('configuredCapacity'), event.getParam('newWorkload'));
        helper.resetLightState(component);
    },

    flagUpdated : function(component, event, helper) {
        helper.logToConsole("flagUpdated event");
        helper.logToConsole("event.isFlagged:" + event.getParam('isFlagged'));
        helper.logToConsole("event.message:" + event.getParam('message'));
        helper.logToConsole("event.roleUpdatedBy:" + event.getParam('roleUpdatedBy'));
        helper.logToConsole("event.updatedBy:" + event.getParam('updatedBy'));
        helper.updateFlagRaised(component, event.getParam('isFlagged'));
        helper.resetLightState(component);
    }
})
