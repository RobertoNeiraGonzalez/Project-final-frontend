import React, { useState } from 'react'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material'
import AdminAddUser from './AdminAddUser'
import AdminAddPet from './AdminAddPet'
import AdminDeletePet from './AdminDeletePet'
import AdminDeleteUser from './AdminDeleteUser'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminPanel = () => {
  const [openModal, setOpenModal] = useState(false)

  const handleModalOpen = () => {
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setOpenModal(false)
  }

  return (
    <Container style={{ marginTop: '10px',marginBottom:"50px" }} maxWidth="md">
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleModalOpen}>
            <AdminPanelSettingsIcon/>
            Panel de Control
          </Button>
          <Dialog open={openModal} onClose={handleModalClose} aria-labelledby="dialog-title">
            <DialogTitle id="dialog-title">Selecciona una opción</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <AdminAddUser />
                </Grid>
                <Grid item>
                  <AdminAddPet />
                </Grid>
                <Grid item>
                  <AdminDeletePet />
                </Grid>
                <Grid item>
                  <AdminDeleteUser />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminPanel

