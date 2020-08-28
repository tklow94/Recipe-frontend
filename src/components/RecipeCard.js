import React from 'react'
import Comments from './Comments'

function RecipeCard({comments, setComments}) {
    return (
        <div className="container">
<div className="active-recipe">
    <img className="active-recipe__img" src="https://www.edamam.com/food-img/c6e/c6e5c3bd8d3bc15175d9766971a4d1b2.jpg" alt="No Content Found" />
    <h3 className="active-recipe__title">Recipe Title</h3>
    <h4 className="active-active-recipe__publisher">Source</h4>
    <p className="active-recipe__website">Recipe:</p>
    <table >
  <tr>
    <th>Nutritient</th>
    <th>Percent </th> 
    <th>Daily Value</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>80</td>
  </tr>
</table>
<br/><br/>
<button className="active-recipe__button">
                      GO BACK 
                    </button>
            </div>
            <br/><br/>
            <Comments comments={comments} setComments={setComments}/>
        </div>
    )
}

export default RecipeCard
