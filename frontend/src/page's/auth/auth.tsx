import React, { useState } from 'react';
import { Input } from '../../component/inputPole/inputPole';
import { Link, useNavigate} from 'react-router-dom';
import style from './auth.module.css';
import { validationRegister, validationLogin} from '../../utils/validation/validation';
import { ValidationError } from 'yup';


export const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const navigate = useNavigate();

    const [errors, setErrors]= useState<{ [key: string]: string}>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked} = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await validationRegister.validate(formData, {abortEarly: false});
            setErrors({});
            const response = await fetch('http://localhost:5000/registration/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok){
                const errorData = await response.json();
                // Можно обработать ошибки с сервера
                console.log('Server error:', errorData);
                return;
            }

            const data = await response.json();
            console.log('Успішна реєстрація' + data)
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err instanceof ValidationError){
                const newErrors: {[key: string]: string} = {};
                err.inner.forEach((e) => {
                    if(e.path)
                    newErrors[e.path] = e.message;
                });

                setErrors(newErrors)
            }
        }
    } 
    return (
        <div className={style.registerContainer}>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Your Name"
                    name='username'
                    id='username'
                    type="text"
                    placeholder="Name & Surmane"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                />
                <Input
                    label="Email"
                    name='email'
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    label="Password"
                    name='password'
                    id='password'
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <Input
                    label="Confirm Password"
                    name='confirmPassword'
                    id='confirmPassword'
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="checkbox"
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleChange}
                        />
                        <span style={{ fontSize: '15px' }}>
                            I agree with <Link to='/privacyPolicy'>privacy policy</Link>
                        </span>
                    </div>

                   {errors.agreeToTerms && (
                        <div style={{ color: '#d9534f', fontSize: '12px', fontWeight: '700', textAlign: 'left'}}>
                        {errors.agreeToTerms}
                        </div>
                    )}
                </div>
                <button type="submit">
                    Register
                </button>
                <span style={{ fontSize: '15px', marginTop: '10px' }}>Im alredy have account <Link to='/login'>Log In</Link></span>
            </form>
        </div>
    );
};




export const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors]= useState<{ [key: string]: string}>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await validationLogin.validate(formData, {abortEarly: false});
            setErrors({});
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (!response.ok){
                const errorData = await response.json();
                console.log('Server error:', errorData);
                alert(JSON.stringify(errorData)); // 👈 тимчасово
                return;
            }

            const data = await response.json();
            console.log('Успішна логін' + data)
            navigate('/dashboard');
        } catch (err: unknown) {
            if (err instanceof ValidationError){
                const newErrors: {[key: string]: string} = {};
                err.inner.forEach((e) => {
                    if(e.path)
                    newErrors[e.path] = e.message;
                });

                setErrors(newErrors)
            }
        }
    } 


    return( <div className={style.registerContainer}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    name='email'
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Input
                    label="Password"
                    name='password'
                    id='password'
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                />
                <button type="submit">
                    Login
                </button>
                <span style={{ fontSize: '15px', marginTop: '10px' }}>You have not account <Link to='/register'>Sign In</Link></span>
            </form>
        </div>
    );
}