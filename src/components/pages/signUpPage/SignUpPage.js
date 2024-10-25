import { useDispatch } from 'react-redux';
import { useState } from 'react';

import {registrationUser} from '../../../actions';

import './signUpPage.scss';

const SignUpPage = () => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: ""
    });    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: "",
            email: "",
            password: ""
        };

        if (!/^[A-Za-z\s]+$/.test(name)) {
            newErrors.name = "Name should contain only letters";
            valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long";
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };
    

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.error("Form validation failed");
            return;
        }
        const avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s";
        dispatch(registrationUser(name, email, password, avatarUrl));
        setName("");
        setEmail("");
        setPassword("");
        setErrors({
            name: "",
            email: "",
            password: ""
        });
    };
    

    return (
        <section className='section'>
            <div className='wrapper'>
            <div className='login__offer'>
                        <form className='form' onSubmit={handleSignUp}>
                            <h1>Sign up</h1>  
                            <div className='login__fields'>
                                <div className='form-input-offer'>
                                    <label htmlFor="name" className='form-label'>
                                        Name:
                                    </label>
                                    <div className='flex-offer-col gap-5'>
                                        <input className={`form-input ${errors.name ? 'form-input-wrong' : ''}`} name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                        {errors.name && <p className='form-text-danger'>{errors.name}</p>}
                                    </div>
                                </div>
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
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
            </div>
        </section>
    )
}

export default SignUpPage;