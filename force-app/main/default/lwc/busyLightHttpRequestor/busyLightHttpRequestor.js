import { LightningElement,api } from 'lwc';

export default class BusyLightHttpRequestor extends LightningElement {

    @api sendRequest(action, red, green, blue)
    {
        console.log("BusyLightLWC: parameters: action:" + action + ", red:" + red + ", green:" + green + ", blue:" + blue);
        var parameters = 'action=' + action;
        
        if ((red >= 0 && red <= 100) && (green >= 0 && green <= 100) && (blue >= 0 && blue <= 100))
        {
            parameters += '&red=' + red + '&green=' + green + '&blue=' + blue;
        }

        const Http = new XMLHttpRequest();
        //Http.open("GET", requestURL);
        console.log("BusyLightLWC: parameters: " + parameters);
        try 
        {   
            Http.open("GET", 'http://localhost:8989/?' + parameters);
        }
        catch (err)
        {
            console.error("BusyLightLWC: Error - " + err.message);
        }
        Http.onreadystatechange = (e) => {
            console.log("BusyLightLWC: " + Http.responseText)
        }
        Http.send();
    }
}