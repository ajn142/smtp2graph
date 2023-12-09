# smtp2graph

Docker image for relaying mail from SMTP to the Microsoft Graph API. Uses node smtp-server and MS Graph sendMail.

-   Attachments no larger than 3MB supported

## Deploy

```bash
cp .env-example .env
vim .env # Make any edits needed (e.g., your Graph API info
docker compose up # I recommend not running detached until you've sent a test email, much easier to get logs while attached.
```

<br/>

## Environment Variables

| Variable                 | What it do?                                     |
| ------------------------ | ----------------------------------------------- |
| CLIENT_ID                | Azure Application (client) ID                   |
| CLIENT_SECRET            | Azure Application Client Secret                 |
| TENANT_ID                | Directory (tenant) ID                           |
| DEV_MODE                 | Disables email relaying                         |
| WEB_SERVER               | Enables web server for capturing emails         |
| WEB_SERVER_MESSAGE_LIMIT | Limits the ammount of emails to store in memory |

<br/>

## Azure Application Setup

The Azure Application must have the following API permissions:

| API / Permissions name            | Type        | Admin consent required |
| --------------------------------- | ----------- | ---------------------- |
| Microsoft Graph: <b>Mail.Send</b> | Application | Yes                    |
