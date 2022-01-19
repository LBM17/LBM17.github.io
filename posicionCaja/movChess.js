function getMousePosition(event) {
    console.log(event.clientY, event.clientX);
    let img = document.getElementById('img');
  
    if (event.clientY <= 100) {
      img.style.top = `0`;
    } else {
      img.style.top = `calc(${event.clientY}px - 100px)`;
    }
  }
  
  document.addEventListener('click', getMousePosition);