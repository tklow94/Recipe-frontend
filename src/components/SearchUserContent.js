import React from 'react'

function SearchUserContent({userRecipes}) {
    console.log(userRecipes.map(recipe => recipe.name).filter(name => name.includes("trevor")))
    return (
        <div>
            
        </div>
    )
}

export default SearchUserContent
