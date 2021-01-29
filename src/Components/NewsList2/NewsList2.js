import React, { useEffect, useState } from "react";
import Axios from "axios";
import Spinner from "../Spinner/Spinner";
import classes from "./NewsList2.module.css";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import XMLParser from "react-xml-parser";
import Parser from "html-react-parser";

function NewsList2(props) {
	const [post, setPost] = useState([]);
	const [err, seterr] = useState(null);
	const [loading, setloading] = useState(true);
	const [cat, setCat] = useState(null);
	const [recomend, setRecomend] = useState(null)

	let url1 = ``;
	if (cat === undefined || cat === null) {
		url1 = `https://cors-anywhere.herokuapp.com/https://news.abplive.com/home/feed`;
	} else {
		url1 = `https://cors-anywhere.herokuapp.com/https://news.abplive.com${cat}`;
	}

	useEffect(() => {
		setloading(true);

		if (props.location.state.indexOf("home") > -1) {
			setCat(null);
		} else {
			let activity = Object.keys(localStorage).reduce(function (obj, str) {
				obj[str] = localStorage.getItem(str);
				return obj;
			}, {});

			let activityPoints = Object.values(activity);
			console.log(activityPoints);
			let max = Math.max.apply(null, activityPoints);
			console.log({ max });
			let result = "";
			let activityKey = Object.keys(activity).forEach(function eachKey(key) {
				console.log(activity[key], "value");
				if (Number(activity[key]) == Number(max)) {
					console.log("-----", key);
					result = key;
				}
			});
			console.log({ result });
			setRecomend(result)
			setCat(`/${result}/feed`);
		}
// console.log("000", props.location.state, "000");
		setCat(props.location.state);
	}, [props.location.state]);

	useEffect(() => {
		// console.log(props.location.state,url1,cat)
		Axios.get(url1, {
			headers: new Headers({
				Accept: "text/html",
				"content-type": "application/x-www-form-urlencoded",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT",
				"Access-Control-Allow-Headers": "Content-Type",
			}),
			mode: "no-cors",
		})
			.then((d) => {
				let p = [];
				var xml = new XMLParser().parseFromString(d.data);
				let news = xml.children[0].children;
				for (let i in news) {
					if (
						news[i].children !== null &&
						news[i].children !== [] &&
						news[i].children.length > 0
					) {
						p.push(news[i].children);
					}
				}
				setPost(p);

				setloading(false);
			})
			.catch((e) => {
				setloading(false);
				console.log(e);
				seterr(e);
			});
	}, [url1]);

	// const getRecomendation=()=>{



	// 	return <h2>{recomend}</h2>

	// }

	let posts = post.map((p, index) => (
		<>
			

			<Link
				className={classes.colors}
				key={index}
				to={{
					pathname: `${props.location.pathname}/${index}`,
					customObject: p,
					state: [
						p[0].value,
						p[1].value,
						p[7].value,
						p[9].attributes.url,
						p[3].value,
					],
				}}
			>
				<div className={`card ${classes.card}`} style={{}}>
					<div className={classes.cardhorizontal}>
						<div className="img-square-wrapper">
							<img className="" src={p[9]?.attributes.url} alt="Card  cap" />
						</div>

						<div className={`card-body ${classes.cardbody}`}>
							<h4 className="card-title">{p[0]?.value}</h4>

							<div className={`card-text ${classes.limit}`}>
								{Parser(Parser(p[7]?.value))}
							</div>
						</div>
					</div>
					<div className="card-footer">
						<small className="text-muted">
							{moment.utc(p[3].value).format("llll")}
						</small>
					</div>
				</div>
			</Link>
		</>
	));

	let rendered;
	let error;
	let errorMsg;
	if (err && !loading) {
		console.log("Errtor is :", err);
		error = err.code ? err.code : err.name;
		errorMsg = err.message;
		rendered = (
			<>
				<h2 className="red center">{error}</h2>
				<p className="errorMessage center">{errorMsg}</p>
			</>
		);
	}

	if (loading) {
		rendered = <Spinner />;
	}
	if (!loading && posts.length > 0) {
		rendered = <div>{posts}</div>;
	}

	return (
		<div>
			<div
			style={{textAlign:'center',position:'absolute',top:0,left:'20%'}}
			>
				{recomend && <h2
				
				
				> You are interested in {recomend} category news.</h2>}

			</div>
			<div className="container">{rendered}</div>
		</div>
	);
}

export default withRouter(NewsList2);
