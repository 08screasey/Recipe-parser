import React from "react";
import Aux from "../../../hoc/Auxilliary";
import Button from "../Buttons/Buttons";
import servings from "../../../assets/servings.png";
import homepage from "../../../assets/homepage.png";
import add from "../../../assets/add.png";
import editRecipe from "../../../assets/editRecipe.png";
import addNotes from "../../../assets/addNotes.png";
import search from "../../../assets/search.png";
import filtered from "../../../assets/filter.png";
import info from "../../../assets/info.png";
import icon from "../../../assets/menu_toggle.png";
import "./Info.css";
import buttons from "../../../assets/Screenshot (24).png";

class Info extends React.Component {
	state = { page: 0 }
	handlePageChange = (num) => {
		this.setState((state) => {
			return { page: (state.page + num) % 7 };
		});
	}

	render() {
		let content = null;

		switch (this.state.page) {
			case 0:
				content = (
					<Aux>
						<h1 className="Green">Welcome To the Recipe Analyser!</h1>
						<p>
							We created this app so that you can store recipes you find on websites without swimming through miles of text to find it.
						</p>
						<img
							src={homepage}
							className="w-100"
							alt="Example of home page"
						/>
						<p>
							{this.props.login ? "Once you're registered and logged in you'll see " : "This page is "}your home page, where you can see all
							the recipe's you've saved to your account
						</p>
						<p>
							At the top of this page is your user information.
							This includes the name you would like to be called
							by and the tags currently associated with your
							account
						</p>
						<p>
							We've included some basic tags you might use, but
							feel free to add or remove any whenever you like!
						</p>
					</Aux>
				);
				break;
			case 1:
				content = (
					<Aux>
						<h1 className="Green">Adding Your First Recipe</h1>
						<p>
							The only information we need to get your recipe
							saved is the URL.
						</p>
						<p>
							If you're on mobile tap the <img src={icon} alt="menu toggler example" className="d-inline-block my-0" style={{width:"40px", paddingBottom:"10px"}}/> icon to bring up the main menu. Next, head
							over to the{" "}
							<span
								style={{
									fontSize: "30px",
									fontFamily: "'Cookie', cursive",
								}}
							>
								Add New Recipe
							</span>{" "}
							page.
						</p>
						<img
							src={add}
							className="w-100"
							alt="a preview of the add url button"
						/>
						<p>
							Paste your URL in to the search bar the recipe
							parser will return your recipe.
						</p>
						<p>
							Once our parser has created your recipe, you are free
							to modify it as much as you want before you save it to your account.
						</p>
					</Aux>
				);
				break;
			case 2:
				content = (
					<Aux>
						<h1 className="Green">Exploring The Recipe Details</h1>
						<p>
							Cooking for 20? Increase the servings to get the
							correct recipe for you.
						</p>
						<img
							className="w-100"
							src={servings}
							alt="Example of serving buttons"
						/>
						<p>
							At the bottom of the recipe there are two buttons,
							one to edit the recipe and one to save the preview
							to your account.
						</p>
						<img
							src={buttons}
							className="w-100"
							alt="An screenshot of the buttons"
						/>
						<p>
							From The Edit Section you can modify ingredients,
							add different tags to your recipe's or create some
							additional notes if you need to remember for next
							time
						</p>
					</Aux>
				);
				break;
			case 3:
				content = (
					<Aux>
						<h1 className="Green">Editing Your Recipe</h1>
						<p>
							On the edit screen you are free to modify any and
							all parts of the recipe.
						</p>
						<p>
							Adding or removing ingredients is as simple as
							clicking the buttons at the top of the ingredients
							segment.
						</p>
						<img
							className="w-100"
							src={editRecipe}
							alt="Example of serving buttons"
						/>
						<p className="my-3">
							From this edit screen you may also add custom notes,
							and select which tags you'd like your recipe to be
							associated with.
						</p>
						<img
							className="w-100"
							src={addNotes}
							alt="screenshot of notes section"
						/>
						<p>
							Don't worry if you make a mistake, you'll get to see
							a preview again before we save your recipe (You'll
							still be able to edit once it's saved too!).
						</p>
					</Aux>
				);
				break;
			case 4:
				content = (
					<Aux>
						<h1 className="Green">Filtering Your Recipes</h1>
						<p>
							In the mood for a chocolate cake? You can search
							your own recipes for terms that match what you're
							looking for below.
						</p>
						<img
							src={filtered}
							className="w-100"
							alt="screenshot of example filter"
						/>
						<p>
							For a more refined search, can click on the tags in
							your account details that you want to see, and start
							searching from there.
						</p>
					</Aux>
				);
				break;
			case 5:
				content = (
					<Aux>
						<h1 className="Green">Hungry For More?</h1>
						<p>
							If you can't decide what to have for dinner, click
							the{" "}
							<span
								style={{
									fontSize: "30px",
									fontFamily: "'Cookie', cursive",
								}}
							>
								Search
							</span>{" "}
							option from the main menu.
						</p>
						<p>
							Just like your personal recipes, you can browse our
							database for recipes that match what you're looking
							for, and even add them to your account if you find
							something you like!
						</p>
						<img
							src={search}
							className="w-100"
							alt="screenshot of search page"
						/>
						<p>
							Tip: If something wasn't quite how you liked
							it, you are free to edit the recipe until it's
							perfect.
						</p>
					</Aux>
				);
				break;
				case 6:
					content = (<Aux>
						<h1 className="Green">The Info Button</h1>
						<p>If at any point you're lost, and need a refresher on how to use this website, simply click the little blue '?' next to the search bar on your account page and this panel will appear once more.</p>
						<img src={info} className="w-75" alt="screenshot of info button"/>
						<p className="text-center">We're always here if you need help.</p>
						<p>Note: To exit this screen tap the small red <i className="fas fa-times-circle" style={{color:"hsla(15, 96%, 62%, 1)"}}></i> in the corner, happy cooking!</p>
						</Aux>)
				break;
			default:
				break;
		}

		return (
			<div
				className="Info position-relative"
				style={{ minHeight: "100%", paddingBottom: "50px" }}
			>
				{content}
				<div
					className="position-absolute d-flex justify-content-between w-100"
					style={{ bottom: "10px", marginLeft: "-5%" }}
				>
					<Button
						clicked={() => this.handlePageChange(-1)}
						disabled={this.state.page === 0}
						btnType="green"
					>
						Back
					</Button>
					<Button
						clicked={() => this.handlePageChange(+1)}
						disabled={this.state.page === 6}
						btnType="green"
					>
						Next
					</Button>
				</div>
			</div>
		);
	}
}

export default Info;
