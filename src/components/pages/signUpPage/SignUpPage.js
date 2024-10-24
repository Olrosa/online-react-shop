import { useDispatch } from 'react-redux';
import { useState } from 'react';

import {registrationUser} from '../../../actions';

import avatar from '../../../resources/img/thumbnail.png';
import './signUpPage.scss';

const SignUpPage = () => {
    const dispatch = useDispatch();


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        if (!email || !password || !name) {
            console.error("Все поля должны быть заполнены");
            return;
        }
        const avatarUrl = "https://picsum.photos/800";
        console.log(name, email, password, avatar)
        dispatch(registrationUser(name, email, password, avatarUrl));
    }

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
                                    <input className='form-input' name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                                </div>
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