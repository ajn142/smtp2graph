import axios from 'axios';
import { Email } from '../types';

export const getToken = async () => {
	const params = new URLSearchParams();
	params.append('grant_type', 'client_credentials');
	params.append('client_id', process.env.CLIENT_ID || '');
	params.append('client_secret', process.env.CLIENT_SECRET || '');
	params.append('resource', 'https://graph.microsoft.com');
	const res = await axios.post(`https://login.microsoftonline.com/${process.env.TENANT_ID || ''}/oauth2/token`, params);
	return res.data.access_token;
};

export const sendEmail = async (token: string, email: Email) => {
	let cte = 'Text';
	let ct = email.text;
	if (email.body != ''){
		cte = 'HTML';
		ct = email.body;
	}
	return axios
		.post(
			'https://graph.microsoft.com/v1.0/users/' + email.from + '/sendMail',
			{
				message: {
					from: {
						emailAddress: {
							name: email.fromName,
							address: email.from,
						},
					},
					subject: email.subject,
					body: {
						contentType: cte,
						content: ct,
					},
					toRecipients: email.to.map((address) => {
						return {
							emailAddress: {
								address: address,
							},
						};
					}),
					ccRecipients: email.cc ? email.cc.map((address) => {
						return {
							emailAddress: {
								address: address,
							},
						};
					}) : undefined,
					bccRecipients: email.bcc ? email.bcc.map((address) => {
						return {
							emailAddress: {
								address: address,
							},
						};
					}) : undefined,
					attachments: email.attachments ? email.attachments.map((attachment) => {
						if (attachment.filename == "") {
							return {
								'@odata.type': '#microsoft.graph.fileAttachment',
								name: attachment.contentId,
								contentType: attachment.contentType,
								contentBytes: attachment.content.toString('base64'),
							};	
						} else {
							return {
								'@odata.type': '#microsoft.graph.fileAttachment',
								name: attachment.filename,
								contentType: attachment.contentType,
								contentBytes: attachment.content.toString('base64'),
							};
						}
					}) : undefined,
				},
				saveToSentItems: 'true',
			},
			{
				headers: { Authorization: 'Bearer '.concat(token) },
				// 'Content-Type': 'application/json',
			}
		)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			} 
			else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
			}
			else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
			}
			console.log(error.config);
			return error.response;
		});
};
