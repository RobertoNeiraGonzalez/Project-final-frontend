import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { createOwnPet, getRaces } from '../../services/pet.services'
import { useNavigate } from 'react-router-dom'
import { fire } from "../../services/firebase.service"
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage"
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'




const genero = [
  {
    value: 'Masculino',
    label: 'Macho',
  },
  {
    value: 'Femenino',
    label: 'Hembra',
  }
]

const tamaño = [
  {
    value: 'Pequeño',
    label: 'Pequeño',
  },
  {
    value: 'Mediano',
    label: 'Mediano',
  },
  {
    value: 'Grande',
    label: 'Grande',
  }
]

const especie = [
  {
    value: 1,
    label: 'Perro',
  },
  {
    value: 2,
    label: 'Gato',
  },

]

const roles = [
  {
    value: "Free",
    label: "Mascota",
  },
  {
    value: "Embrace",
    label: "Acogida",
  },
  {
    value: "Adoption",
    label: "Adopcion",
  },

]

function FormDropdown() {
  const [open, setOpen] = useState(false)
  const [allRaces, setAllRaces] = useState([])
  const [allRacesData, setAllRacesData] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const datosRaza = await getRaces()
        setAllRacesData(datosRaza)
      } catch (error) {
        console.error(error)
      }
    }
    fetchSpecies()
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [name, setName] = useState()
  const [age, setAge] = useState()
  const [gender, setGender] = useState()
  const [size, setSize] = useState()
  const [info, setInfo] = useState()
  const [role, setRole] = useState()
  const [speciesId, setSpeciesId] = useState()
  const [raceId, setRace] = useState()
  const [image, setImage] = useState("")

  useEffect(() => {
    if (speciesId === 1) {
      const tipoEspecie = allRacesData.filter((option) => option.speciesId === 1)
      setAllRaces(tipoEspecie)
    }
    if (speciesId === 2) {
      const tipoEspecie = allRacesData.filter((option) => option.speciesId === 2)
      setAllRaces(tipoEspecie)
    }
  }, [speciesId, allRacesData])


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {

      let imageUrl = ''
      if (image) {
        const storage = getStorage(fire)
        const storageRef = ref(storage, 'images/' + image.name)
        await uploadBytes(storageRef, image)
        imageUrl=await getDownloadURL(storageRef)
      }

      const payload = {
        name,
        age,
        gender,
        size,
        info,
        role,
        speciesId,
        raceId,
        image:imageUrl

      }
      const result = await createOwnPet(payload)
      if (result === 200) {

      }
    } catch (error) {
      console.log(error)
    }
    navigate('/perfil/misMascotas')
    handleClose()
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <AddIcon/> <Typography>Añadir Mascota</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nueva Mascota</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Nombre" fullWidth margin="normal"
              onChange={(e) => setName(e.target.value)} />
            <TextField label="" fullWidth margin="normal" type='file'
              onChange={(e) => e.target.files[0] && setImage(e.target.files[0])} />

            <TextField label="Edad" fullWidth margin="normal"
              onChange={(e) => setAge(e.target.value)} />
            <TextField fullWidth margin="normal"
              id="outlined-select-currency"
              select
              label="Genero"
              defaultValue="Masculino"
              helperText="Selecciona el genero"
              onChange={(e) => setGender(e.target.value)}
            >
              {genero.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth margin="normal"
              id="outlined-select-currency"
              select
              label="Tamaño"
              defaultValue="Pequeño"
              helperText="Elige un tamaño"
              onChange={(e) => setSize(e.target.value)}
            >
              {tamaño.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth margin="normal"
              id="outlined-select-currency"
              select
              label="Especie"
              defaultValue=""
              helperText="Elige una especie"
              onChange={(e) => setSpeciesId(e.target.value)}
            >
              {especie.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth margin="normal"
              id="outlined-select-currency"
              select
              label="Raza"
              defaultValue=""
              helperText="Elige una raza"
              onChange={(e) => setRace(e.target.value)}
            >
              {allRaces.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Informacion" fullWidth margin="normal"
              onChange={(e) => setInfo(e.target.value)} />
            <TextField fullWidth margin="normal"
              id="outlined-select-currency"
              select
              label="Role"
              defaultValue="Free"
              helperText="Elige una opcion para tu mascota"
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FormDropdown
