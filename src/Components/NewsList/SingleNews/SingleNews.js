// import React, { useState ,useEffect} from "react";
import classes from "./SingleNews.module.css";
import Parser from "html-react-parser";
import React, { Component } from "react";

export class SingleNews extends Component {
	constructor(props) {
		super(props);

		this.state = {
			news: this.props.location.state,
		};
	}
	componentDidMount() {
		console.log(this.props);

		console.log(window.location.href, "----");
		if (window.location.href.indexOf("Crime") > -1) {
			// alert("your url contains the name franky");
			let Crime = Number(localStorage.getItem("Crime"));
			Crime++;
			localStorage.setItem("Crime", Crime);
		} else if (window.location.href.indexOf("Health") > -1) {
			let Health = Number(localStorage.getItem("Health"));
			Health++;
			localStorage.setItem("Health", Health);
		} else if (window.location.href.indexOf("Entertainment") > -1) {
			let Entertainment = Number(localStorage.getItem("Entertainment"));
			Entertainment++;
			localStorage.setItem("Entertainment", Entertainment);
		} else if (window.location.href.indexOf("Sports") > -1) {
			let Sports = Number(localStorage.getItem("Sports"));
			Sports++;
			localStorage.setItem("Sports", Sports);
		} else if (window.location.href.indexOf("Buisness") > -1) {
			let Buisness = Number(localStorage.getItem("Buisness"));
			Buisness++;
			localStorage.setItem("Buisness", Buisness);
		} else if (window.location.href.indexOf("Technology") > -1) {
			let Technology = Number(localStorage.getItem("Technology"));
			Technology++;
			localStorage.setItem("Technology", Technology);
		} else if (window.location.href.indexOf("COVID-19") > -1) {
			let COVID = Number(localStorage.getItem("COVID"));
			COVID++;
			localStorage.setItem("COVID", COVID);
		} else if (window.location.href.indexOf("World") > -1) {
			let World = Number(localStorage.getItem("World"));
			World++;
			localStorage.setItem("World", World);
		} else if (window.location.href.indexOf("India") > -1) {
			let India = Number(localStorage.getItem("India"));
			India++;
			localStorage.setItem("India", India);
		}

		this.setState({
			news: this.props.location.state,
		});
	}
	render() {
		console.log(this.props, this.state);
		return (
			<div className="container">
				<div className={`card ${classes.card}`}>
					<h1 className={classes.h1}>{this.state.news[0]}</h1>
					<img className="card-img-top" src={this.state.news[3]} alt="Card " />
					<div className="card-body">
						<h4 className="card-title">{this.state.news[0]}</h4>
						<div className="card-text">
							{Parser(Parser(this.state.news[2]))}
						</div>
						<div className="card-text">
							{Parser(Parser(this.state.news[2]))}
						</div>
						<a
							href={this.state.news[1]}
							className="btn btn-primary"
							target="_blank"
							rel="noopener noreferrer"
						>
							Read complete story
						</a>
					</div>

					<div className="card-footer">
						<small className="text-muted">{this.state.news[4]}</small>
					</div>
				</div>
			</div>
		);
	}
}

export default SingleNews;
