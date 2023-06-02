if (window.File && window.FileReader && window.FileList && window.Blob) {
    function handleFileSelect(evt: Event) {
        let file = (<HTMLInputElement>evt.target).files![0];

        if (!file.type.match('video.*')) {
            return;
        }

        let reader = new FileReader();

        reader.onload = function (f) {
                let videoDiv = document.getElementsByClassName('video-container');

                if (videoDiv[0] != null) {
                    videoDiv[0].parentNode!.removeChild(videoDiv[0]);
                }

                let div = document.createElement('div');
                div.id = "video-div";
                div.className = "video-container";
                div.innerHTML = '<video controls id="video" class="thumb" src="' + f.target!.result + '" title="' + escape(file.name) + '"/>';

                document.getElementById('video-output')!.insertBefore(div, null);

                let loadingMessage = document.createElement('p');

                loadingMessage.id = "loading";
                loadingMessage.className = "loading-message";
                loadingMessage.innerHTML = 'Cargando...';

                document.getElementById('video-output')!.insertBefore(loadingMessage, null);

                let video = <HTMLVideoElement>document.getElementById('video');
                let playButton = document.getElementById('play')!;
                let pauseButton = document.getElementById('pause')!;
                let volumeUp = document.getElementById('up')!;
                let volumeDown = document.getElementById('down')!;

                playButton.addEventListener('click', () => {
                    video.play();
                });

                pauseButton!.addEventListener('click', () => {
                    video.pause();
                })

                volumeUp!.addEventListener('click', () => {
                    video.volume += 0.1;
                })

                volumeDown!.addEventListener('click', () => {
                    video.volume -= 0.1;
                })

                video.addEventListener('canplay', () => {
                    let loadingMessage = document.getElementById('loading')!;

                    document.getElementById('video-output')!.removeChild(loadingMessage);

                    video.style.visibility = "visible";

                    playButton.style.visibility = "visible";
                    pauseButton.style.visibility = "visible";
                    volumeUp.style.visibility = "visible";
                    volumeDown.style.visibility = "visible";
                });
            };

        reader.readAsDataURL(file);
    }

    document.getElementById('file')!.addEventListener('change', handleFileSelect, false);
} else {
    alert('File APIs no están soportadas por este navegador.')
}