import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import './Auth.css'

const RegisterForm = () => {
    return (
        <>
            <Form>
                <Form.Group className="form-group">
                    <Form.Control type="text" placeholder="Username..." name="username" required />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Control type="text" placeholder="Password..." name="password" required />
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Control type="text" placeholder="Comfirm Password..." name="comfirmPassword" required />
                </Form.Group>
                <Button variant="success" type="submit">Register</Button>
            </Form>
            <p>Don't you have an account?</p>
            <Link to="/login">
                <Button variant='info' size='sm' className="ml-2">Login</Button>
            </Link>
        </>
    )
}

export default RegisterForm