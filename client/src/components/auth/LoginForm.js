import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import './Auth.css'

const LoginForm = () => {

    // context
    const { loginUser } = useContext(AuthContext)

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    //  Router
    let navigate = useNavigate()

    const { username, password } = loginForm

    const onchangeLoginForm = e => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const login = async e => {
        e.preventDefault()
        try {
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                navigate('/dashboard')
            }
        } catch (error) {

        }
    }

    return (
        <>
            <Form onSubmit={login}>
                <Form.Group className="form-group">
                    <Form.Control
                        type="text"
                        placeholder="Username..."
                        name="username"
                        value={username}
                        onChange={onchangeLoginForm}
                        required
                    />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Control
                        type="text"
                        placeholder="Password..."
                        name="password"
                        value={password}
                        onChange={onchangeLoginForm}
                        required />
                </Form.Group>
                <Button variant="success" type="submit">Login</Button>
            </Form>
            <p>Don't you have an account?</p>
            <Link to="/register">
                <Button variant='info' size='sm' className="ml-2">Register</Button>
            </Link>
        </>
    )
}

export default LoginForm