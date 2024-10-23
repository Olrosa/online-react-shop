import { Link } from 'react-router-dom';

import './loginPage.scss';

const LoginPage = () => {
    return (
        <>
            <section className='section login'>
                <div className='wrapper'>
                    <div className='login__offer'>
                        <form className='form'>
                            <h1>Sing in</h1>  
                            <div className='login__fields'>
                                <div className='form-input-offer'>
                                    <label for="email" className='form-label'>
                                        Email:
                                    </label>
                                    <input className='form-input' name="email"/>
                                </div>
                                <div className='form-input-offer'>
                                    <label for="password" className='form-label'>
                                        Password:
                                    </label>
                                    <input className='form-input' name="password"/>
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