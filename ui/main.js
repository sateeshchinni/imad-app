var button= document.getElementById('counter');
//var counter = 0;

button.onclick = function (){
   
   //create request
   var request = new XMLHttpRequest();
   
   request.onreadystatechange = function (){
     if(request.readyState === XMLHttpRequest.DONE) {
         if(request.status === 200){
             var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
             
         }
     }
   };
   
   // make request
   
   request.open('GET','http://msgtosateesh.imad.hasura-app.io/counter',true);
   request.send(null);
};
   
   
   var submit = document.getElementById('submit_btn');
   
   submit.onclick = function(){
       
          var request = new XMLHttpRequest();
   
   request.onreadystatechange = function (){
     if(request.readyState === XMLHttpRequest.DONE) {
         if(request.status === 200){
             
     var names= request.responseText;
     names = JSON.parse(names);
     
     var list = '';
     
     for (var i=0;i<names.length;i++){
         list += '<li>'+names[i]+'</li>';
     }
     
     var url=document.getElementById('namelist');
     
     url.innerHTML = list;
   }
             
         }
     };
   
      var nameInput = document.getElementById('name');
   var name=nameInput.value;

      
   request.open('GET','http://msgtosateesh.imad.hasura-app.io/submit-name?name=' + name ,true);
   request.send(null);
   
  
};

 
   var submits = document.getElementById('submit_btn2');
   
   submits.onclick = function(){
       
          var request = new XMLHttpRequest();
   
   request.onreadystatechange = function (){
     if(request.readyState === XMLHttpRequest.DONE) {
         if(request.status === 200){
            console.log('user logged in') ;
            alert('logged in successfully');
       }else if (request.status === 403){
           alert('username/password is incorrect');
       }else if(request.status === 500){
           alert('something went wrong on the server');
       }
             
         }
     };
   
   var username = document.getElementById('username').value;
   var password = document.getElementById('password').value;
   
   console.log(username);
   console.log(password);
   
      
   request.open('POST','http://msgtosateesh.imad.hasura-app.io/login',true);
   request.setRequestHeader ('Contect-Type','application/json');
   request.send(JSON.stringify({username:username,password:password}));
   
};


     
   
   
//   counter = counter + 1;
//   var span = document.getElementById('count');
//   span.innerHTML = counter.toString();
    



// console.log('Loaded!');

// var element= document.getElementById("main-text");

// element.innerHTML = "New Value";

// var img=document.getElementById("madi");
// var marginLeft = 0 ;

// function moveRight(){
//     marginLeft = marginLeft + 1;
//     img.style.marginLeft = marginLeft + 'px';
// }

// img.onclick=function(){
    
//     var interval = setInterval(moveRight,50);
    
// //    img.style.marginLeft = '100px';
// };