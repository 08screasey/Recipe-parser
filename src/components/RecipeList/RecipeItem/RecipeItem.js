import React from "react";
import "./RecipeItem.css";
import { Waypoint } from "react-waypoint";

class RecipeItem extends React.Component {
	state = { inVP: false };

	changeClasses = (bool) => {
		this.setState((prevState) => {
			return { inVP: bool };
		});
	};

	render() {
		return (
			<div className="RecipeItem" onClick={this.props.clicked} style={{overflow: "hidden"}}>
				<Waypoint
					onEnter={()=>this.changeClasses(true)}
					onLeave={()=>this.changeClasses(false)}
					bottomOffset="-200px"
				>
					<div
						className={"Viewport-BG"}
						style={{ transform: this.state.inVP ? "translateY(0)" : "translateY(200px)" }}
					>
						<p
							className="m-auto text-center"
							style={{
								color: this.state.inVP ? "white" : "black",
							}}
						>
							{this.props.recipe.title}
						</p>
						<div className="row position-absolute RecipeItemInfo justify-content-around">
							<div className="col-6 text-center">
								<span>
									Ready in: {this.props.recipe.readyInMinutes}
								</span>
							</div>
							<div className="col-6 text-center">
								<span>
									Servings in: {this.props.recipe.servings}
								</span>
							</div>
						</div>
					</div>
				</Waypoint>
				<img
					width="100%"
					src={this.props.recipe.imageURL}
					height="400px"
					alt=""
				/>
				{/*<h4>
				{this.props.recipe.title}
			</h4>*/}
			</div>
		);
	}
}

export default RecipeItem;
