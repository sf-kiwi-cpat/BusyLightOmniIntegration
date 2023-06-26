# BusyLight and Omni-Channel Integration

This project listens to the various Omni-Channel Toolkit events and sends a GET request to a local http server, as appropriate to update the light.

### Pre-reqs
1. Omni-Channel enabled in setup 
2. At least 1 channel configured
3. BusyLight http server running on local machine, listening on port 8989

### To get this working in an Org:
1. Import Aura component into your Org
2. Add Component to the Utility bar of your Service Console - this can be done by
   - Open 'App Manager' from setup
   - Selecting 'Edit' on your App
   - Clicking on Utility Items option
   - Add the 'BusyLightOmniListener' item
   - Save changes
3. From Setup, go to 'CSP Trusted Sites' and add 'http://localhost:8989' as the 'Trusted Site URL', and check the box for 'Allow site for connect-src'
4. Login as an Agent in the App you just edited and login to Omni-Channel - light should light up (assuming your local server is running on localhost:8989)


## Options to extend
1. Load light colors/actions from Custom Metadata to allow admin level customization of light - https://help.salesforce.com/s/articleView?id=sf.custommetadatatypes_overview.htm&language=en_US&type=5 
2. Add a setup page/flow for Admins to run to configure colors/actions (enhanced version of 1 above - would/could still save to custom metadata)
3. Keep track of the number of work items routed and accepted to keep light flashing until all work is accepted (or all flags lowered etc.)


## Salesforce Developer guides

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
