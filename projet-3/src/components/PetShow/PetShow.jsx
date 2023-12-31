import './PetShow.css'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import PetsIcon from '@mui/icons-material/Pets'
import GitHubIcon from '@mui/icons-material/GitHub'
import FormDialog from '../Contact/Contact.jsx'
import { updatePet } from '../../services/pet.services.js'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function PetShow({ pet }) {
  const [expanded, setExpanded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [likes, setLikes] = useState(pet.likes)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }

  const handleFavoriteClick = async () => {
    if (!isFavorite){
      try {
        const sumar = likes + 1
        setLikes(sumar)
        const payload = {
          likes: sumar
        }
        const result = await updatePet(pet.id, payload)
        setIsFavorite(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      {Object.keys(pet).length !== 0 ?
        <>
          <Card 
          sx={{ 
            width: "400px", 
            margin: '15px', 
            borderRadius: '10px',
            boxShadow: '20',
            '@media (max-width: 450px)': {
              width: '350px', 
              marginTop: '50px',
            },
            }}>

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: '#168da0'}} aria-label="recipe">
                  {pet.speciesId === 1 ? <PetsIcon/> : <GitHubIcon/> }
                </Avatar>
              }
              title={pet.race.name}
              titleTypographyProps={{ variant: 'h6', color: 'primary' }}
            />

              <CardMedia
                component="img"
                height="350"
                image={pet.image || "https://source.unsplash.com/random?dog"}
                alt="imagen"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            
            <CardContent>
              <Typography variant="body2" color="text.secondary" style={{ backgroundColor: '#e0e0e0', width: '100%', padding: '8px' }}>
                {pet.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ backgroundColor: '#f0f0f0', width: '100%', padding: '8px' }}>
                {pet.age === 1 ? `${pet.age} año` : `${pet.age} años`}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>

              <IconButton
                aria-label="Añadir a tus favoritos"
                onClick={handleFavoriteClick}
                color={isFavorite ? 'error' : 'default'}>
                <FavoriteIcon /><Typography>{likes}</Typography>
              </IconButton>

              <Box sx={{ width: 66 }} />

              <FormDialog pet={pet} />

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Mostrar más">
                <ExpandMoreIcon />
              </ExpandMore>

            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph><b>{pet.name}</b></Typography>
                <Typography paragraph>
                  {pet.info}
                </Typography>
              </CardContent>
            </Collapse>

          </Card>
        </> :
        <LinearProgress />
      }
    </div>
  );
}

PetShow.propTypes = {
  pet: PropTypes.object
}