import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {loginUser} from '../../../actions'

import './loginPage.scss';

const LoginPage = () => {
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginAttempted, setIsLoginAttempted] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthorized = useSelector(state => state.authorization);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            email: "",
            password: ""
        };


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (password.length < 4) {
            newErrors.password = "Password must be at least 4 characters long";
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };

    useEffect(() => {
        isAuthorized &&navigate('/profile');

        if (isLoginAttempted) {
            if (isAuthorized) {
                navigate('/profile');
                setLoginError(false);
            } else {
                setLoginError(true);
            }
            setIsLoginAttempted(false); 
        }
    }, [isAuthorized, navigate, isLoginAttempted]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return; 
        }
    
        await dispatch(loginUser(email, password));
        setIsLoginAttempted(true);
        setEmail("");
        setPassword("");
    };
    

    return (
        <>
            <section className='section login'>
                <div className='wrapper'>
                    <div className='login__offer'>
                        <form className='form' onSubmit={handleLogin}>
                            <h1>Sign in</h1>  
                            <div className='login__fields'>
                                <div className='form-input-offer'>
                                    <label htmlFor="email" className='form-label'>
                                        Email:
                                    </label>
                                    <div className='flex-offer-col gap-5'>
                                        <input className={`form-input ${errors.email ? 'form-input-wrong' : ''}`} name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                        {errors.email && <p className='form-text-danger'>{errors.email}</p>}
                                    </div>
                                </div>
                                <div className='form-input-offer'>
                                    <label htmlFor="password" className='form-label'>
                                        Password:
                                    </label>
                                    <div className='flex-offer-col gap-5'>
                                        <input className={`form-input ${errors.password ? 'form-input-wrong' : ''}`} name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                        {errors.password && <p className='form-text-danger'>{errors.password}</p>}
                                    </div>
                                </div>
                                <div className='flex-offer-col gap-5'>
                                    <button className='button'>
                                        Sign in
                                    </button>
                                    {loginError && (<p className='form-text-danger'>
                                        Email or password is wrong
                                    </p>)}
                                    <p className='form-text'>
                                        Sign in or <Link to="/signup">sign up</Link>.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage;