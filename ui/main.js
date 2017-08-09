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
   
   
   var nameInput = document.getElementById('name');
   var name=nameInput.value;
   var submit = document.getElementById('submit_btn');
   
   submit.onclick = function(){
     
     var names= [ 'name1','name2','name3'];
     
     var list = '';
     
     for (var i=0;i<names.length;i++){
         list = '<li>'+names[i]+'</li>';
     }
     
     var url=document.getElementById('namelist');
     
     url.innerHTML = list;
   };
   
   
//   counter = counter + 1;
//   var span = document.getElementById('count');
//   span.innerHTML = counter.toString();
    
};


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
