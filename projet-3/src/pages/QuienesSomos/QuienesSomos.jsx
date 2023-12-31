import { Card, CardContent, CardMedia, Typography, Grid, Box, IconButton } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import './QuienesSomos.css'

function QuienesSomos() {
  const teamMembers = [
    { name: 'ROBER', image: 'https://firebasestorage.googleapis.com/v0/b/proyecto3-1af75.appspot.com/o/profile%2Froberto.JPG?alt=media&token=28b0d931-9251-4c04-a8e3-cc0fba6035d1', github: 'https://github.com/RobertoNeiraGonzalez/' },
    { name: 'EBEN', image: 'https://firebasestorage.googleapis.com/v0/b/proyecto3-1af75.appspot.com/o/profile%2Feben.jpg?alt=media&token=773ec880-19b4-431a-93e5-f07f72b2359c', github: 'https://github.com/EbenGonzalez' },
    { name: 'CHRISTIAN', image: 'https://firebasestorage.googleapis.com/v0/b/proyecto3-1af75.appspot.com/o/profile%2Fchristian.JPG?alt=media&token=2a929987-51c9-44fa-9d6b-60afb67035df', github: 'https://github.com/ChristianValverdeMonsalve' }
  ]

  return (
    <>
      <header className='header'>
        <h1 style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: "10px" }}>Bienvenido a WAY HOME</h1>
      </header>
      <div id='principal'>
        <Box
         display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         textAlign="center"
         marginTop="50px">
        <section className='sectionQuienesSomos' style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: "5px" }}>
          <h2>Historia de la Empresa</h2>
          <Typography variant="body2" color="text.secondary" style={{ fontSize:"25px", width: '100%', padding: '15px',borderRadius: '12px 12px 12px 12px'}}>
              En <b>WAY HOME</b>, nos apasiona conectar a animales necesitados con hogares amorosos. <br></br>Fundada en 2023, nuestra plataforma ha sido un lugar de encuentro para dueños de mascotas que buscan el mejor cuidado para sus amigos peludos.
          </Typography>
        </section>
        <section className='sectionQuienesSomos' style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: "5px" }}>
          <h2>Misión y Visión</h2>
          <Typography variant="body2" color="text.secondary" style={{ fontSize:"25px", width: '100%', padding: '15px',borderRadius: '12px 12px 12px 12px',textAlign:"center" }}>
          <strong>Misión:</strong> Facilitar la adopción y acogida temporal de perros y gatos, creando un espacio donde los dueños encuentren <br></br> soluciones amorosas y temporales para sus mascotas.
          <br></br><strong>Visión:</strong> Ser el puente que une a los amantes de los animales, proporcionando un ambiente de confianza y apoyo para todas las criaturas peludas.
          </Typography>
        </section>
        </Box>
        <section style={{ textAlign: 'center', fontFamily: 'monospace', letterSpacing: "5px" }}>
        <h2 > Equipo</h2 >
        <Box display="flex" justifyContent="center">
        <Grid container spacing={2} justifyContent="center" alignItems="center" marginTop={"20px"} >
          {teamMembers.map((member, index) => (
            <Grid key={index} item xs={4} sm={3} md={2} textAlign="center">
              <Card sx={{ borderRadius: '12px', textAlign: 'center', margin: '25px', marginBottom: '37px' }}>
                <CardMedia
                  component="img"
                  height="300"
                  width="200px"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    borderRadius: '12px 12px 0 0',
                    objectFit: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
                <CardContent>
                  <Typography variant="body2" component="div">
                    {member.name}
                  </Typography>
                  <IconButton aria-label="GitHub" href={member.github} target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      </section>
      </div>
      
    </>
  )
}

export default QuienesSomos;