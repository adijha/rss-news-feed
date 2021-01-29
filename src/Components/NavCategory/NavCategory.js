import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import "./NavCategory.css";
import Axios from "axios";

export class NavCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: [
				{ type: "Home", categoryUrl: "/home/feed" },
				{ type: "India News", categoryUrl: "/news/india/feed" },
				{ type: "World News", categoryUrl: "/news/world/feed" },
				{ type: "Entertainment", categoryUrl: "/entertainment/bollywood/feed" },
				{ type: "Crime", categoryUrl: "/news/crime/feed" },
				{ type: "Sports", categoryUrl: "/sports/feed" },
				{ type: "Buisness", categoryUrl: "/business/feed" },
				{ type: "Health", categoryUrl: "/lifestyle/health/feed" },
				{ type: "Technology", categoryUrl: "/technology/feed" },
				{ type: "COVID-19", categoryUrl: "/latest-news/covid-19/feed" },
			],
      selectedCategory: "/home/feed",
      news:[]
		};
  }
  
  async getHeadline() {
    console.log('--------')
    try {
      
      let response= await Axios.get(
          "http://newsapi.org/v2/top-headlines?country=in&apiKey=78d6e15d54654eb085f84ab26cf7179b"
      );
      response.data.articles.length =5
       this.setState({ news: response.data.articles });
       console.log(response.data.articles)
    } catch (error) {
      console.error(error)
    }
   
}

  componentDidMount() {
    
  this.getHeadline()
  }

	ClickHandler = (url) => {
		this.setState({
			selectedCategory: url,
		});
	};
	render() {
		let cat = this.state.category.map((c) => (
			<li key={c.type}>
				<NavLink
					onClick={this.props.clicked}
					to={{
						pathname: `/${c.type}`,
						state: `${c.categoryUrl}`,
					}}
				>
					{c.type}
				</NavLink>
			</li>
		));
		return (
			<div>
        <marquee
        
        >
          

          {this.state.news.map((theElement) => theElement.title.toString())}
       
        
        
        </marquee>

				<ul className="ullist">{cat}</ul>

				{/* <Newslist selectedCategory={this.state.selectedCategory} /> */}
			</div>
		);
	}
}

export default NavCategory;
