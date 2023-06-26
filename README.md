# BusyLight and Omni-Channel Integration

This project listens to the various Omni-Channel Toolkit events and sends a GET request to a local http server, as appropriate to update the light.

#Pre-reqs
1. Omni-Channel setup and configured with at least 1 channel

#To get this working in an Org:
1. Import Aura component into your Org
2. Add Component to the Utility bar of your Service Console - this can be done from 'App Manager', selecting 'Edit' on your App, clicking on Utility Items option, and adding the 'BusyLightOmniListener' item and save
3. Login as an Agent and login to Omni-Channel - light should light up (assuming your local server is running on localhost:8989)

## Salesforce Developer guides

- [Salesforce Extensions Documentation](https://developer.salesforce.com/tools/vscode/)
- [Salesforce CLI Setup Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm)
- [Salesforce DX Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.sfdx_dev.meta/sfdx_dev/sfdx_dev_intro.htm)
- [Salesforce CLI Command Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)
