import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../../actions'

import ProfileCard from '../../profileCard/ProfileCard';

import './profilePage.scss';

const ProfilePage = () => {
    const {role, user} = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const toAdmin = () => {
        if (role === 'admin') {
            navigate("/admin")
        }
    }

    const adminPage = role === 'admin' ? <li onClick={toAdmin} className='button profile__navigate-link'>Admin page</li> : null;

    return (
        <section className='section'>
            <div className='wrapper'>
                <div className='profile__offer flex-offer-col gap-20'>
                    <h1>Welcome - {user.name}</h1>
                    <div className='flex-offer jus-con-sb gap-20 no-wrap'>
                        <ProfileCard/>
                        <ul className='profile__navigate'>
                            <li className='profile__navigate-link profile__navigate-link-active button'>
                                Personal information
                            </li>
                            <li className='profile__navigate-link button'>
                                Orders
                            </li>
                            <li className='profile__navigate-link button' onClick={() => dispatch(logout())}>
                                Exit
                            </li>
                            {adminPage}
                        </ul>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default ProfilePage;