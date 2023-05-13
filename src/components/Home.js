import React, { useState } from "react";
import "../css/home.css";
import { generatePath, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core/";
import {Search} from "@material-ui/icons"
export default function Home() {
	const onUpdate = (e) => {
		setSearch(e.target.value);
	};
	const [search, setSearch] = useState("");
	let history = useHistory();
	const getData = (e) => {
		e.preventDefault();
		if (search !== "") {
			// const RE2 = require("re2");
			const re1 = new RegExp(
				"(https://)(www.youtube.com|youtu.be)/(watch\\?v=)?(?<videoid>[a-zA-Z0-9_-]{11})"
			);
			const res = search.match(re1);
			if (res !== null) {
				console.log("link");
				const url = generatePath("/download/:id", { id: res.groups.videoid });
				history.push(url);
			} else {
				console.log("keyword");
				const url = generatePath("/search/:q", { q: search });
				history.push(url);
			}
			setSearch("");
		}
	};
	return (
		<div className="header">
			<h2 id="head" className="center">
				Download Youtube Videos For Free
			</h2>
			<p className="center">
				Paste the url or type the keyword you want to search for
			</p>
			<form className="searchbar" onSubmit={getData}>
				<TextField className="queryinp" 
        id="outlined-basic" label="Search" variant="filled" onChange={onUpdate} value={search}/>
				<Button startIcon={<Search/>} onClick={getData} type="submit" id="submit">
					Search
				</Button>
			</form>
		</div>
	);
}
