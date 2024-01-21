window.onload = () => {

    const videoV     = document.getElementById("videoV");
    const recordBtn  = document.getElementById("record");
    const stopBtn    = document.getElementById("stop");
    const downloader = document.getElementById("downloader");

    const options = {
        audio: true,
        video: {
            width: 1920,
            height: 1080
        }
    }

    const mediaDevice = navigator.mediaDevices.getUserMedia(options);

    let mediaRecorder, recording = true;
    let videoData   = [];

    function setup()
    {
        mediaDevice.then(mediaStream =>{
            videoV.srcObject = mediaStream;
            videoV.play();
    
            mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorder.addEventListener("dataavailable", ev => videoData.push(ev.data));
            mediaRecorder.addEventListener("stop", onStopRecording);
    
            recordBtn.addEventListener("click", startRecording);
            stopBtn.addEventListener("click", stopRecording);
        });
    }

    function onStopRecording(){
        let dt;
        let isValid = false;

        while(!isValid)
        {
            dt = prompt(">>> ¿Cómo se llamará la grabación?\n");

            isValid = dt.trim() != "" ? true : false; 
        }
        
        downloader.download = dt;
        downloader.href = URL.createObjectURL(new Blob(videoData));
        downloader.click();

        URL.revokeObjectURL(downloader.href);
        videoData = [];
    }

    function startRecording(){
        recording = true;
        mediaRecorder.start();
    }

    function stopRecording(){
        recording = false;
        mediaRecorder.stop();
    }

    setup();

}