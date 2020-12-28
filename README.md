# webnode
Low level Webmail Service with Node

# What is

This is an low level REST webservice implementation of a webmail server.<br>
The idea was build without using any framework.

# How to run

To run this application [Node](https://nodejs.org/en/download/) must be installed. Download the recommended version and after that, go ahead.<br>

Clone the repository:
```sh
git clone https://github.com/Isaius/webnode
```

Just enter in the project folder via terminal and type the following comand:

```sh
cd webnode
```
Now, we have to install the dependencies to properly run the application
```sh
npm install
```
or if you use yarn<br>

```sh
yarn
```

With that done, NOW we can really run:
```sh
npm start
```
or if you use yarn<br>

```sh
yarn start
```

After that, go to the browser and type or click in the link below:

http://localhost:3333/

# Endpoints

## Send Email

Send a post to create an email. If the users doesn't exist already, they will be created in the folder `users` as `USERNAMEinbox.json`.<br>

URL: `/` <br>
METHOD: `POST`<br>
BODY: 
```json
{
	"from": "pepe",
	"to": "kona",
	"subject": "New guy",
	"body": "i heard that there is a new guy, bongo kat.",
	"uuid": "",
	"replies": []
}
```
RESPONSES: 
- `201` if OK
- `400` user incorrect or not found 

The `uuid` and `replies` fields are just for easy handling in the server.

## Reply Email

Send a post to reply an email. Replace the `UUID` for the uuid of the email to reply.<br>

URL: `/mail/{UUID}` <br>
METHOD: `POST`<br>
BODY: 
```json
{
	"from": "kona",
	"body": "i heard that too. Seems to be a famous musician"
}
```
RESPONSES: 
- `201` if OK
- `400` user incorrect or not found 
## List Inbox

Just replace the `USERNAME` for the user that you want to list the inbox.<br>

URL: `/inbox/{USERNAME}` <br>
METHOD: `GET`<br>
RESPONSES: 
- `200` if OK
- `400` user incorrect or not found

## Open Email

Just replace the `UUID` for the uuid of the email you want to get.<br>

URL: `/mail/{UUID}` <br>
METHOD: `GET`<br>
RESPONSES: 
- `200` if OK
- `400` uuid incorrect or not found 

## Delete Email

Just replace the `UUID` for the uuid of the email and `USER` of you want to delete the email.<br>

URL: `/mail/{UUID}/{USER}` <br>
METHOD: `DELETE`<br>
RESPONSES: 
- `200` if OK
- `400` uuid or user incorrect or not found

## Foward Email

Just replace the `UUID` for the uuid of the email and `TO_USER` with the user that you want to send the email.<br>

URL: `/foward/{UUID}/{TO_USER}` <br>
METHOD: `PUT`<br>
RESPONSES: 
- `200` if OK
- `400` uuid or user incorrect or not found 

# Notes

- This is a college work to Distributed Systems subject.
- The emails and inbox are real text files, but implemented to be possible change easy just changind the functions `writeInbox`, `getInbox`, `writeEmail` and `getEmail`
- Anything wrong? Open a issue!
- Feel free to use
