import React from 'react';
import RecipeItem from './RecipeItem/RecipeItem';
import './RecipeList.css';

const recipeList = (props) => {
	
	const recipeItems = props.recipes.map((recipe, id)=>{

		return (		
			<RecipeItem recipe={recipe} key={id} link={id} clicked={()=>props.clicked(id)}/>
		)
	});
	return(	<div className="RecipeList d-flex flex-wrap justify-content-around">
			 {recipeItems}
			</div>)
}


export default recipeList;