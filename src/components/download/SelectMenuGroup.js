import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import "../../css/selectmenugroup.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import clsx from "clsx";

const _ = require("underscore");
const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    background: "#333333",
  },
  rooot: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tty: {
    width: "345px",
  },
  tab: {
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    background: "white",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.rooot}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function SelectMenuGroup({ formats, videoId, title }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [mp4s, setMp4s] = useState([]);
  const [webms, setWebms] = useState([]);
  const [ready, setReady] = useState(false);
  const mp3s = [64, 128, 192, 256, 320];
  const [itag, setItag] = useState(0);
  const [bitrate, setBitRate] = useState(0);
  useEffect(() => {
    setMp4s(
      _.filter(
        formats,
        (item) =>
          (item.container === "mp4") &
          (item.hasVideo === true) &
          (item.itag < 300)
      )
    );
    setWebms(
      _.filter(
        formats,
        (item) => (item.container === "webm") & (item.hasVideo === true)
      )
    );
    setReady(true);
  }, []);
  const handleChangeinput = (event) => {
    const tag = event.target.value;
    console.log(tag);
    setItag(tag);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMp3Input = (event) => {
    const rate = event.target.value;
    console.log(rate);
    setBitRate(rate);
  };
  return (
    <div className={`${classes.tty} select-menu`}>
      <Paper className={`${classes.root} paper`}>
        <Tabs
          className="tabs"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
        >
          <Tab className={classes.tab} label="mp4" />
          <Tab className={classes.tab} label="mp3" />
          <Tab className={classes.tab} label="webm" />
        </Tabs>
      </Paper>
      {value === 0 && ready && (
        <div className="mp4-select-list flex-column-children">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              onChange={handleChangeinput}
              name="customized-radios"
            >
              {mp4s.map((ele) => (
                <FormControlLabel
                  value={`${ele.itag.toString()}-${ele.qualityLabel}`}
                  control={<StyledRadio />}
                  // label={ele.qualityLabel}
                  label={
                    ele.itag > 100
                      ? `${ele.qualityLabel} - No Audio`
                      : `${ele.qualityLabel} - Has Audio`
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            className="dl-btn"
            href={`https://dl11-ytmate.herokuapp.com/dlvid/?id=${videoId}&xsfs=${title}&tag=${itag}&auth=5773a83bf2dabeaaac84a8089630041ae6fd8994ba4b5db2a68e3b8bfe0767e7&con=mp4`}
          >
            Download
          </Button>
        </div>
      )}
      {value === 1 && ready && (
        <div className="mp3-select-list flex-column-children">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              onChange={handleMp3Input}
              name="customized-radios"
              className="centered"
            >
              {mp3s.map((ele) => (
                <FormControlLabel
                  value={ele.toString()}
                  control={<StyledRadio />}
                  // label={ele.qualityLabel}
                  label={`${ele} kbps`}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            className="dl-btn"
            href={`https://dl11-ytmate.herokuapp.com/dlaud/?id=${videoId}&xsfs=${title}&bit=${bitrate}k&auth=5773a83bf2dabeaaac84a8089630041ae6fd8994ba4b5db2a68e3b8bfe0767e7`}
          >
            Download
          </Button>
        </div>
      )}
    </div>
  );
}
