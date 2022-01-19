let img = document.getElementById("img"); 
let state = false; 
img.addEventListener('click', ()=>{
    if(!state){
        img.classList.add('moveY'); 
        img.classList.remove('returnY'); 
        
        state = true; 
    }else{
        img.classList.remove('moveY'); 
        img.classList.add('returnY'); 
        state=false; 
    }
}); 