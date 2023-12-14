import './NavBar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Inbox from '../Inbox/Inbox'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import { logout } from '../../services/auth'

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { getInboxComments } from '../../services/comment.services'

const pages = [
  {
    name: "Acogida",
    path: "/acogida"
  },
  {
    name: "Adopción",
    path: "/adopcion"
  },
  {
    name: "Voluntarios",
    path: "/voluntarios"
  }
]

const settings = [
  {
    name: "Perfil",
    path: "/perfil"
  },
  {
    name: "Login",
    path: "/login"
  },
]

const ariaLabel = { 'aria-label': 'description' }

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [comment, setComment] = useState([])
  const [inbox, setInbox] = useState(0)
  const [showInbox, setShowInbox] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await getInboxComments()
      setComment(result)
      if (localStorage.token) {
        if (result) {
          setInbox(result.length)
        } else {
          return null
        }
      } else {
        return null
      }
    }
    fetchData()
  }, [])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleOpenInbox = () => {
    setShowInbox(true);
  };

  const handleCloseInbox = () => {
    setShowInbox(false);
  };



  return (
    <AppBar sx={{/* ajusta la altura según tus necesidades */ }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <Typography
              variant="h6"
              noWrap
              component="span"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              WAY-HOME
            </Typography>
          </Link>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} to={page.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="span"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            WAY-HOME
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.path} key={page.name}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
          </Box>
          <IconButton onClick={handleOpenInbox}>
            <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
              <Badge max={99} overlap="rectangular" color="error" badgeContent={inbox} invisible={showInbox}>
                <MailIcon color='secondary' />
              </Badge>
            </Stack>
          </IconButton>
          {showInbox && (
            <Inbox onClose={handleCloseInbox} />
          )}

           <Box sx={{ width: 26 }} />

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'flex' } }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Way Home" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link to={setting.path} key={setting.name}>
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Link to={"/"}>
                <MenuItem onClick={() => { logout(), handleCloseUserMenu() }}>Logout</MenuItem>
              </Link>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar