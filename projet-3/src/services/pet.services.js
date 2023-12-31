import api from "./config"

const getAllPets = async () => {
  try {
    const { data } = await api.get("/pets", {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const getEmbracePets = async () => {
  try {
    const { data } = await api.get("/pets")
    return data.filter(pet => pet.role === "embrace")
  } catch (error) {
    console.log(error)
  }
}

const getAdoptionPets = async () => {
  try {
    const { data } = await api.get("/pets")
    return data.filter(pet => pet.role === "adoption")
  } catch (error) {
    console.log(error)
  }
}

const getOnePet = async (id) => {
  try {
    const { data } = await api.get(`/pets/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

const getOwnPets = async () => {
  try {
    const { data } = await api.get("/pets/me", {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const createOwnPet = async (body) => {
  try {
    const { data } = await api.post("/pets/me",body,
    {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const createPet = async (body) => {
  try {
    const { data } = await api.post("/pets",body, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const updateOwnPet = async (id,body) => {
  try {
    const { data } = await api.put(`/pets/me/${id}`,body,{
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const updatePet = async (id,body) => {
  try {
    const { data } = await api.put(`/pets/${id}`,body,{
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const deleteOwnPet = async (id) => {
  try {
    const { data } = await api.delete(`/pets/me/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const deletePet = async (id) => {
  try {
    const { data } = await api.delete(`/pets/${id}`, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const getRaces = async (id) => {
  try {
    const { data } = await api.get(`/races`)
    return data
  } catch (error) {
    console.log(error)
  }
}

export { getAllPets, getOnePet, getOwnPets,getEmbracePets,getAdoptionPets, createOwnPet, createPet, updateOwnPet, updatePet, deleteOwnPet, deletePet,getRaces  }
