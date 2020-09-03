import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../Buttons/Buttons';
import notes from '../../../assets/adding notes.png';
import servings from '../../../assets/servings.png';
import tags from '../../../assets/tags.png';
import add from '../../../assets/add.png';
import './Info.css';
import buttons from '../../../assets/Screenshot (24).png';
import NavItem from '../../Navigation/NavItems/NavItem/NavItem'
class Info extends React.Component {
state={page:0}
handlePageChange = (num) => {
	this.setState((state)=>{
		return{page:(state.page+num)%4}
	})
}

render(){

let content = null;

	switch(this.state.page){
		case 0:
		content = (<Aux>
		<h1 className="Green">Welcome To the Recipe Parser!</h1>
		<p>Have you grown tired of sifting through blogs looking for a recipe, only to have your phone freeze from the overwhelming adds and unneccessary animations?</p>
		<p>We've created a safe space for your beloved recipes to be safely stored away!</p>
		<p>This page is your home page, where you can see all the recipe's you've saved to your account</p>
		<p>At the top of this page is your user information. This includes the name you would like to be called by and the tags currently associated with your account</p>
		<p>We've included some basic tags you might use, but feel free to add or remove any whenever you like!</p>
		</Aux>);
		break;
		case 1:
		content = (<Aux><h1 className="Green">Adding Your First Recipe</h1>
			<p>The only information we need to get your recipe saved is the URL!</p>
			<p>Tap on the icon in the top right corner and head over the the <span style={{fontSize:"30px", fontFamily:"'Cookie', cursive"}}>Add New Recipe</span> page.</p><img src={add} alt="a preview of the add url button"/><p>Paste your URL in to the search bar and watch the magic happen.</p>
			</Aux>)
		break;
		case 2:
		content=(<Aux><h1 className="Green">Exploring The Recipe Details</h1>
			<p>Once our API has created your recipe, you are free to modify it before you save it to your account.</p>
			<p>Cooking for 20? Increase the servings to get the correct recipe for you.</p>
			<img className="w-75 d-block m-auto" src={servings} alt="Example of serving buttons" />
			<p>Scrolling to the bottom of the recipe will give 2 buttons: 1 to save the recipe to your account and 1 to edit the recipe.</p>
			<img src={buttons} alt="An image of the buttons" />
			<p>From The Edit Section you can modify ingredients, add different tags to your recipe's or create some additional notes if you need to remember for next time</p>
			</Aux>);
		break;
		case 3:
		content = (<Aux><h1 className="Green">Filtering Your Recipes</h1>
			<p>In the mood for a chocolate cake? No sweat! You can search your own recipes for terms that match what you're looking for below</p>
			<p>For a more refined search, can click on the tags in your account details that you want to see, and start searching from there.</p>
			<h1 className="Green">Hungry For More?</h1>
			<p>If you can't decide what to have for dinner, click the <span style={{fontSize:"30px", fontFamily:"'Cookie', cursive"}}>Search</span> option from the main menu.</p>
			<p>Just like your personal recipes, you can browse our database for recipes that match what you're looking for, and even add them to your account if you find something you like!</p>
			<p>Remember, if something wasn't quite how you liked it, edit the recipe until it's perfect.</p>
			</Aux>)
		break;
		

	}

	return (<div className="position-relative Info h-100">
		{content}
		<div className="position-absolute d-flex justify-content-between w-100" style={{bottom:"10px"}}>
		<Button clicked={()=>this.handlePageChange(-1)} disabled={this.state.page===0} btnType="green">Back</Button>
		<Button clicked={()=>this.handlePageChange(+1)} disabled={this.state.page===3} btnType="green">Next</Button>
		</div>
		</div>
		)
}}

export default Info;