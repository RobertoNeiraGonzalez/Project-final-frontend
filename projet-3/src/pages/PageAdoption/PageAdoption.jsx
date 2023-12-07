import './PageAdoption.css'

import { getAllPets, getAdoptionPets } from '../../services/pet.services'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PetShow from '../../components/PetShow/PetShow'


function PageAdoption() {

  const [petShow, setPetShow] = useState([])
  console.log(petShow)
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getAdoptionPets()
      setPetShow(result)
    }
    fetchData()
  }, [])

  const petsShowFunc = () => {
    return petShow.map(pet => {
      return (
        <Link to='/adopcion' key={pet.id}>
          <PetShow pet = {pet}/>
        </Link>
      )
    })
  }

  return (
    <div className='pet-card'>{petsShowFunc()}</div>
  )
}

export default PageAdoption