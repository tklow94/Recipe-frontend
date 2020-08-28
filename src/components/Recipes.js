
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 385,
  },

});

export default function Recipes({name, image, source, url, ingredients, dailyValue, servings, calories}) {
  const classes = useStyles();

const energy = Math.round(calories/servings)
const numOfIngredients = ingredients.length

  return (
    
    <Card className={classes.root}>
      <CardActionArea>
        <Link href="/RecipeCard">
        <CardMedia
          component="img"
          alt="Food Pic"
          height="280"
          image={image}
          title="Food Pic"
        />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           Calories: {energy} |{' '}
           Ingredients: {numOfIngredients}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={url}>
            {source}
        </Button>
      </CardActions>
    </Card>
    
  );
}
