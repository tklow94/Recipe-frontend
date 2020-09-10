import React, {useEffect} from 'react'
import AppAppBar from "./Header"
import StickyFooter from './Footer'
import Search from './Search'
import Recipes from './Recipes'
import { Grid } from '@material-ui/core';
import Box from "@material-ui/core/Box";




function Home({recipe, search, setSearch, setQuery}) {
  
    
    
    
    
    return (
        <div>
            <AppAppBar/>
            
            <Search search={search} setSearch={setSearch} setQuery={setQuery}/>
            <Box p={(2,4)}>
            <Grid container justify="center" spacing={2}>
           {recipe.map (recipe => (<Grid item xs={12} sm={6} md={3}><Recipes 
           name={recipe.recipe.label} 
           image={recipe.recipe.image} 
           source={recipe.recipe.source} 
           url={recipe.recipe.url} 
           ingredients={recipe.recipe.ingredientLines} 
           dailyValue={recipe.recipe.totalDaily.ENERC_KCAL.quantity} 
           servings={recipe.recipe.yield}
           calories={recipe.recipe.calories}

           
           />
           </Grid>))}
           </Grid>
           </Box>
            <StickyFooter />
        </div>
    )
}

export default Home
