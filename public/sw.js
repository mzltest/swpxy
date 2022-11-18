var currhost,myhost;
this.addEventListener('fetch', function(event) {
    console.log(event)
    oldurl=event.request.url
   
 if(oldurl.indexOf('//')==-1||oldurl.indexOf(myhost)!=-1){
    console.log('not absolute path,will try :',currhost)
    oldurl=oldurl.replace(myhost,'')
    oldurl=currhost+oldurl
 }
 if(event.request.mode!='navigate' && event.request.url.startsWith('/go?url=')==-1){
    newurl=myhost+"/go?url="+encodeURIComponent(oldurl)
}else{newurl=oldurl}

 console.log('====>',newurl)
    editedreq=new Request(newurl,{
        method:event.request.method,
        headers:event.request.headers,
        body:event.request.body,
     //   mode:event.request.mode,
        credentials:event.request.credentials,
        cache:event.request.cache,
        redirect:event.request.redirect,
        referrer:event.request.referrer,
        duplex:event.request.duplex //chrome
    })
    event.respondWith(
      // magic goes here
   
    fetch(editedreq)
    );
  });
  

this.addEventListener('message', function(event) {
    console.log(event.data)
    currhost=event.data[0]
    myhost=event.data[1]
  })