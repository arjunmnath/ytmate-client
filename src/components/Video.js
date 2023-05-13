import React from "react";
import decode from "html-entities-decode";
import '../css/Video.css';
import { generatePath, useHistory } from "react-router-dom";
import { Divider } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  divider: {
      // Theme Color, or use css color in quote
      background: 'rgb(83, 83, 83)',
      margin: '0.3em'
  },
  dlbtn: {
    marginTop: '0.5em',
  }
}));


export default function Video(item) {

  let classes = useStyles()
  const videoId = item.item.id.videoId;
  const main = item.item.snippet;
  let time = new Date(main.publishedAt).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  let history = useHistory();
  const redirect = (e) => {
    e.preventDefault();
    const url = generatePath("/download/:id", {id: videoId});
    history.push(url)
  }
  return (

    // <Link to={`/download/${videoId}`}>
      <div className="card" onClick={redirect} >
        <div className="preimg">
        <img src={main.thumbnails.medium.url} alt="thumbnail" />
        </div>
        <h2>{decode(main.title)}</h2>

        <Divider classes={{root: classes.divider}}/>
        <p className='sub'>Published: {time}</p>
        <p className="sub">Uploaded By: {main.channelTitle}</p>
        {/* <Divider classes={{root: classes.divider}}/> */}
				<Button className={classes.dlbtn} variant="contained" color="primary">Download</Button>
      </div>
    // </Link>

  );
}
