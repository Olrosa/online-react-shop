import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {loginUser} from '../../../actions'

import usePlatziService from '../../../services/PlatziService';

import './loginPage.scss';

const LoginPage = () => {
    const {login, getUserProfile} = usePlatziService();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };
    

    return (
        <>
            <section className='section login'>
                <div className='wrapper'>
                    <div className='login__offer'>
                        <form className='form' onSubmit={handleLogin}>
                            <h1>Sing in</h1>  
                            <div className='login__fields'>
                                <div className='form-input-offer'>
                                    <label htmlFor="email" className='form-label'>
                                        Email:
                                    </label>
                                    <input className='form-input' name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className='form-input-offer'>
                                    <label htmlFor="password" className='form-label'>
                                        Password:
                                    </label>
                                    <input className='form-input' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                                <div className='flex-offer-col gap-5'>
                                    <button className='button'>
                                        Sign in
                                    </button>
                                    <p className='form-text'>
                                        Sign in or <Link to="/login">sign up</Link>.
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