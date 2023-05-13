import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import "../css/download.css";
import SelectMenuGroup from "./download/SelectMenuGroup";
const _ = require("underscore");

export default function Download({ match }) {
  const [info, setInfo] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [preurl, setPreurl] = useState("");
  const videoId = match.params.id;
  const ytdl = require("ytdl-core");
  const storage = window.localStorage;
  storage.setItem("videoId", videoId);
  useEffect(() => {
    const getInfo = async () => {
      const res = await fetch(
        `https://dl11-ytmate.herokuapp.com/info?id=${videoId}&auth=5773a83bf2dabeaaac84a8089630041ae6fd8994ba4b5db2a68e3b8bfe0767e7`
      );
      const data = await res.json();
      // let data = await ytdl.getInfo(videoId)
      // const response = await fetch(`https://www.youtube.com/get_video_info?video_id=${videoId}&c=TVHTML5&cver=7.20210622.10.00&eurl=https%3A%2F%2Fyoutube.googleapis.com%2Fv%2Fop1QYwRAQpI&ps=default&gl=US&hl=en&html5=1`)
      // const data = await response.json();
      setInfo(data);
      setIsReady(true);
    };
    getInfo();
  }, [videoId]);

  useEffect(() => {
    const d = async () => {
      if (info !== null) {
        const vidurl = _.filter(info.formats, (item) => item.itag === 18);
        // info.map(item => console.log(item))
        setPreurl(vidurl[0].url);

        document.title = `Download - '${info.videoDetails.title}'`;
      }
    };
    d();
  }, [isReady]);
  return (
    <div className="video-download-page">
      <SearchBar />
      {isReady && (
        <div className="download-menu">
          <div className="video_wrapper">
            <video src={preurl} controlsList="nodownload" controls></video>
          </div>
          <div className="download-info">
            <h2>{info.videoDetails.title}</h2>
            <div className="dl-list">
              <SelectMenuGroup
                formats={info.formats}
                videoId={videoId}
                title={info.videoDetails.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
