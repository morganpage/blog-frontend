const fetch = require("node-fetch")
const mailerliteAPI = process.env.MAILERLITE_API_KEY

exports.handler = async (event, context, callback) => {
  const {email,group} = JSON.parse(event.body);
  let url = "https://api.mailerlite.com/api/v2/subscribers/"
  if(group){
    url = `https://api.mailerlite.com/api/v2/groups/${group}/subscribers/`
  }
  // const data = {
  //   name: "Morgan",
  //   email: "morganjpage@gmail.com",
  //   fields: { company: "MailerLite" },
  // }
  const settings = {
    method: "POST",
    body: JSON.stringify({email}),
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mailerliteAPI,
    },
  }
  try {
    const response = await fetch(url, settings)
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    return {
      statusCode: 200,
      body: "Email Sent.",
    }
  } catch (error) {
    console.log(error) // output to netlify function log
    return {
      statusCode: 500,
      body: error.message, 
    }
  }
}