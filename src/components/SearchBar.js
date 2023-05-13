import React, { useState } from "react";
import {Search} from "@material-ui/icons"
import {Button} from "@material-ui/core"

import { generatePath, useHistory } from "react-router-dom";
import "../css/SearchBar.css";
export default function SearchBar() {
	const onUpdate = (e) => {
		setSearch(e.target.value);
	};
	const [search, setSearch] = useState("");

	let history = useHistory();
	const getData = (e) => {
		e.preventDefault();
		const re1 = new RegExp(
			"(https://)(www.youtube.com|youtu.be|youtube.com)/(watch\\?v=)?(?<videoid>[a-zA-Z0-9_-]{11})"
		);
		const res = search.match(re1);
    if (res!==null){
      console.log("link")
      const url = generatePath("/download/:id", {id: res.groups.videoid})
      history.push(url)
    } else {
    console.log("keyword")
		const url = generatePath("/search/:q", { q: search });
		history.push(url);
    }
		setSearch("");

	};
	return (
		<div>
			<form id="searchbar" onSubmit={getData}>
				<input
					id="inp"
					type="text"
					onChange={onUpdate}
					value={search}
					placeholder="Search"
				/>
				<Button onClick={getData} type="submit" id="submitbtn">
				<Search/>
				</Button>
			</form>
		</div>
	);
}
