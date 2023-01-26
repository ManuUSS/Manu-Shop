import NextLink from 'next/link'
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm } from 'react-hook-form';
import { AuthLayout } from "components/layout"
import { validations } from 'utils';

type FormData = {
    email: string,
    password: string,
  };

const LoginPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const onLoginUser = () => {

    }

  return (
    <AuthLayout title="Ingresar">
        <form onSubmit={ handleSubmit( onLoginUser ) }>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={ 2 }>
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h1" textAlign='center'>Iniciar sesión</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label='Correo' 
                            variant="filled" 
                            fullWidth 
                            error = { !!errors.email }
                            helperText = { errors.email?.message }
                            { ...register('email', { 
                                required: 'Este campo es requerido',
                                validate: validations.isEmail
                            }) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='password' 
                            label='Contraseña' 
                            variant="filled" 
                            fullWidth 
                            error = { !!errors.password }
                            helperText = { errors.password?.message }
                            { ...register('password', {
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Mínimo 6 carácteres' }
                            }) }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="secondary" className="circular-btn" type='submit' fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} display='flex' justifyContent='center'>
                        <NextLink href='/auth/register' passHref legacyBehavior>
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
  )
}

export default LoginPage