import './PageVoluntarios.css'

import { getAllVolunteers } from '../../services/user.services'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PetShow from '../../components/PetShow/PetShow'

function PageVoluntarios() {

    const [volunteers, setVolunteers] = useState([])
    console.log(volunteers)

    useEffect(() => {
        const fetchVolunteers = async () => {
            const result = await getAllVolunteers()
            setVolunteers(result)
        }
        fetchVolunteers()
    }, [])

    const volunteerShowFunc = () => {
        return volunteers.map(volunteer => {
            return (
                <Link to='/voluntarios' key={volunteer.id}>
                    <PetShow volunteer={ volunteer }/>
                </Link>
            )
        })
    }

  return (
    <div className='volunteer-card'>{ volunteerShowFunc() }</div>
  )
}

export default PageVoluntarios