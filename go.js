let fetch=require('node-fetch')
const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false
})
exports.handler = async function http(req) {
console.log(req)
if(req.method!='GET'&&req.method!='HEAD'){
  body= req.body}else{
    body=null
  }
headers=req.headers
headers.referer=req.query.url //forge
if(req.query.url.startsWith('https://')){
  newhost=req.query.url.split('https://')[1].split('/')[0]
}else{
  newhost=req.query.url.split('/')[0]
}
headers.host=newhost
let resp=await fetch(req.query.url,{  method: req.method,
headers: headers,        // request headers. format is the identical to that accepted by the Headers constructor (see below)
body: body,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
//signal: null,
agent:agent
     })
     bodytext=await resp.text()
     
     const rheaders = [...resp.headers.entries()].reduce((obj, [key, value]) => (obj[key.toLowerCase()] = value, obj), {})
     rheaders['x-frame-options']='sameorigin'
     rheaders['access-control-allow-origin']='*'
    console.log(rheaders)
return{
  statusCode:resp.status,
  headers:{'content-type':rheaders['content-type'],'set-cookie':rheaders['set-cookie']},
  rheaders:rheaders,
  body:bodytext
}
}