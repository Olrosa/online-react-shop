import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {logout} from '../../../actions'

import './profilePage.scss';

const ProfilePage = () => {
    const {role} = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toAdmin = () => {
        if (role === 'admin') {
            navigate("/admin")
        }
    }

    const adminPage = role === 'admin' ? <button onClick={toAdmin} className='button button-order'>Admin page</button> : null;

    return (
        <section className='section'>
            <div className='wrapper'>
                <div className='profile__offer flex-offer-col gap-20'>
                    <div className='flex-offer jus-con-sb'>
                        <h1>User page</h1>
                        <button onClick={() => dispatch(logout())} className='button button-order'>Logout</button>
                    </div>
                    {adminPage}
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;