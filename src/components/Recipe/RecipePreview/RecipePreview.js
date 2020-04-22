import React from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../../components/UI/Buttons/Buttons';
import './RecipePreview.css';
import {connect} from 'react-redux';

const recipePreview = (props) => {
	
	const servingsCalculator = (amount) => {
	const startNum = (+amount/+props.recipe.servings)*(+props.servings);
	return (parseInt(startNum*100))/100

	}

var urlParts = props.recipe.sourceUrl.replace('http://','').replace('www.','').replace('https://','').split(/[/?#]/);
var domain = urlParts[0];

let ingredients = props.recipe.ingredients.map(ingredient=>{
	return <li key={ingredient.originalName}><strong>{servingsCalculator(ingredient.amount)}</strong> {ingredient.unit} {ingredient.originalName}</li>
});

let instructions = null;

if(props.recipe.instructions){
	instructions = props.recipe.instructions.map(instruction=>{
	return <li key={instruction}>{instruction}</li>
})}

let notes = null;

if(props.recipe.notes){
	notes = props.recipe.notes.map(note=>{
	return <li key={note}>{note}</li>
})}

	return (<div className="RecipePreview">
		<h4 className="pr-2">{props.recipe.title}</h4>
		<div className="row m-3 justify-content-center">
			<div className="col-md-7 ImageDiv">
			<img src={props.recipe.imageURL} alt={props.recipe.title} />
			</div>
			<div className="col-md-5 d-flex flex-column align-items-center justify-content-center ServingsDiv">
			<p>Servings: {+props.servings} <i className="fas fa-plus-circle mx-1 toggler Green" onClick={()=>props.changeServings(1)}></i><i className="fas fa-minus-circle toggler redButton" onClick={()=>props.changeServings(-1)}></i></p>
			<p>Ready In: {props.recipe.readyInMinutes} minutes</p>
				<a href={props.recipe.sourceUrl} target="_blank" rel="noopener noreferrer">{domain}</a>

		</div>
		</div>
		
		<hr />
		<h5>Ingredients:</h5>
		<ul className="RecipePreviewList">
			{ingredients}
		</ul>
		<hr />
		<h5>Instructions:</h5>
		<ol className="RecipePreviewList">
			{instructions}
		</ol>
		{props.recipe.notes && props.recipe.notes[0].length > 0 ? <Aux>
			<hr />
			<h5>My Notes</h5>
			<ol className="RecipePreviewList">{notes}</ol>
			</Aux> 
			: null}
		<div className="d-flex justify-content-around">
		<Button clicked={props.changeMode} btnType="green">Edit Recipe</Button>
		{ !props.authenticated ? <Button btnType="green" clicked={props.unAuthenticated}>Sign in to Add +</Button> : props.saved ? null : <Button clicked={props.saveRecipe} btnType="green">Add To My Recipes</Button>}
		</div>
		</div>
		)
};

const mapStateToProps = state => {
	return {
		authenticated: state.auth.idToken !== null
	}
}

export default connect(mapStateToProps)(recipePreview);