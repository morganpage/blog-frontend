const fetch = require("node-fetch");
const mailerliteAPI = process.env.MAILERLITE_API_KEY;

exports.handler = async function (event, context) {
  //let url = `https://api.mailerlite.com/api/v2/groups/105381565/subscribers?apiKey=${mailerliteAPI}`;
  const {license} = JSON.parse(event.body);

  let url = `https://api.mailerlite.com/api/v2/groups/105381565/subscribers`;
  const settings = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-MailerLite-ApiKey": mailerliteAPI,
    },
  };

  try {
    const response = await fetch(url, settings);
    const data = await response.json();
    let purchaser = data.filter(p => p.fields.filter(f => f.key ==='license' && f.value === license).length > 0);
    //let purchaser = data.filter(p => p.email === license );
    if (purchaser && purchaser.length > 0) {
      let {email} = purchaser[0];
      let product = purchaser[0].fields.filter(f => f.key ==='product')[0].value;
      return {
        statusCode: 200,
        body: JSON.stringify({ email , product }) // Could be a custom message or object i.e. JSON.stringify(err)
      }
    }else{
      return {
        statusCode: 200,
        body: JSON.stringify({ email : "" }) 
      }
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 200,
      body: JSON.stringify({ error }) 
    }
  }
};
