window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext("2d");
    canvas.height = 800;
    canvas.width = 1600;

    //painting
    let painting = false;

    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishPosition(){
        painting = false;
        context.beginPath();
    }

    function draw(e){
        if(!painting) return;
        context.lineWidth = 5;
        context.lineCap = "round";

        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }

    //line
    function startLine(e) {
        painting = true;
        draw(e)
      }
      
      function finishLine(e) {
        painting = false;
        
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        
      }

    //rectangle
    function startRect(e){
        painting = true;
        draw(e)
    }

    function finishRect(){
        painting = false;
        context.strokeRect(e.offsetX, e.offsetY, e.clientX - e.offsetX, e.clientY - e.offsetY);
    }

    //square
    

    //circle


    //clear
    function clearCanvas(){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //save
    function downloadCanvas(){  
        // get canvas data  
        var imageData = canvas.toDataURL(); 
      
        // create temporary link  
        var tmpLink = document.createElement( 'a' );  
        tmpLink.download = 'image.png'; // set the name of the download file 
        tmpLink.href = imageData;  
      
        // temporarily add link to body and initiate the download  
        document.body.appendChild( tmpLink );  
        tmpLink.click();  
        document.body.removeChild( tmpLink );  
    }

    //-----select-----

    let mode = 'draw';

    function selectMode(e, newMode) {
    const tools = document.getElementsByClassName("tool");
    for (const tool of tools) {
        tool.classList.remove('selected');
    }
    
    e.target.parentElement.classList.add('selected');

    mode = newMode;
    }

    const activeEvents = {
    "mousedown": undefined,
    "mouseup": undefined,
    "mousemove": undefined
    };

    function setMode(e, mode) {
    for (const event in activeEvents) {
        canvas.removeEventListener(event, activeEvents[event]);
        activeEvents[event] = undefined;
    }

    switch (mode) {
        case 'paint':
        canvas.addEventListener("mousedown", startPosition);
        canvas.addEventListener("mouseup", finishPosition);
        canvas.addEventListener("mousemove", draw);

        activeEvents['mousedown'] = startPosition;
        activeEvents['mouseup'] = finishPosition;
        activeEvents['mousemove'] = draw;
        break;
        case 'line':
        canvas.addEventListener("mousedown", startLine);
        canvas.addEventListener("mouseup", finishLine);

        activeEvents['mousedown'] = startLine;
        activeEvents['mouseup'] = finishLine;
        break;

        case 'rectangle':
        canvas.addEventListener("mousedown", startRect);
        canvas.addEventListener("mouseup", finishRect);

        activeEvents['mousedown'] = startRect;
        activeEvents['mouseup'] = finishRect;
        break;
        /*
        case 'triangle':
        canvas.addEventListener("mousedown", startTri);
        canvas.addEventListener("mouseup", finishTri);

        activeEvents['mousedown'] = startTri;
        activeEvents['mouseup'] = finishTri;
        break;
        
        case 'circle':
        canvas.addEventListener("mousedown", startCircle);
        canvas.addEventListener("mouseup", finishCircle);

        activeEvents['mousedown'] = startCircle;
        activeEvents['mouseup'] = finishCircle;
        break;
        */

        default:
        break;
    }

    selectMode(e, mode);
    }

    //canvas.addEventListener("mousedown", startPosition);
    //canvas.addEventListener("mouseup", finishPosition);
    //canvas.addEventListener("mousemove", draw);
    //canvas.addEventListener("mousedown", startPath);
    //canvas.addEventListener("mouseup", endPath);

    function initialize() {
        const tools = document.getElementsByClassName('tool');
        for (const tool of tools) {
          tool.addEventListener('click', (e) => { setMode(e, tool.id)} );
        }
      
        document.getElementById('clear').addEventListener('click', clearCanvas);
        
        document.getElementById('save').addEventListener('click', downloadCanvas);
        // set default settings
        document.getElementById('paint').click();
      }
      
      initialize();

})