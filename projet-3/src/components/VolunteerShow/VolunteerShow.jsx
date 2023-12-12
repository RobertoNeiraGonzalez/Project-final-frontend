import "./VolunteerShow.css"

import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import myRating from "../Rating/Rating"
import { Link } from "react-router-dom"




export default function VolunteerShow({volunteer}) {
  return (
    <Card sx={{ maxWidth: 345, margin:'20px' }}>
      <Link to={`/voluntarios/${(volunteer.id)}`}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {volunteer.firstName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <myRating />
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}