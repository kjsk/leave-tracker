import React from "react";
import NotificationSound from "../../utils/notification.mp3";

const AudioComponent = ({ audioPlayer }) => {

    return (
        <audio ref={audioPlayer} src={NotificationSound}>
            <track
                src="captions_es.vtt"
                kind="captions"
                srclang="es"
                label="spanish_captions"
            />
        </audio>
    )
}
export default AudioComponent;