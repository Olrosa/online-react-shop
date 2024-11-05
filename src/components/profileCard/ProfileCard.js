import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {changeUserData} from '../../actions'

import './profileCard.scss';

const ProfileCard = () => {
    const user  = useSelector(state => state.user);
    const {avatar, name, email, password, id} = user;

    const [newAvatar, setNewAvatar] = useState(avatar);
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [errors, setErrors] = useState({
        avatar: "",
        name: "",
        email: "",
        oldPassword: "",
        newPassword: ""
    });

    const dispatch = useDispatch();

    const validateInputs = () => {
        const newErrors = {};
        let isValid = true;
    
        if (newPassword) {
            if (oldPassword !== password) {
                newErrors.oldPassword = "Old password is invalid";
                isValid = false;
            }
            if (newPassword.length < 8) {
                newErrors.newPassword = "New password must be at least 8 characters long";
                isValid = false;
            }
        }
    
        if (newName !== name) {
            if (!/^[A-Za-z\s]+$/.test(newName)) {
                newErrors.name = "Name is invalid";
                isValid = false;
            }
        }
    
        if (newEmail !== email) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                newErrors.email = "Email is invalid";
                isValid = false;
            }
        }
    
        setErrors(newErrors);
        return isValid;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const body = {};

        newAvatar !== avatar && (body.avatar = newAvatar);
        newName !== name && (body.name = newName);
        newEmail !== email && (body.email = newEmail);
        newPassword && (body.password = newPassword);

        if (Object.keys(body).length > 0) {
            dispatch(changeUserData(body, id));
            setErrors({ avatar: "", name: "", email: "", oldPassword: "", newPassword: "" });  // Очистка ошибок
            console.log(body);
        }
    }

    console.log('rerender')

    return(
        <div className='profile__card'>
            <img className='profile__img' src={avatar}/>
            <form className='form flex-offer-col gap-20' onSubmit={handleSubmit}>
                <div className='form-input-offer profile__input-offer'>
                    <label htmlFor="name" className='form-label'>
                        Image:
                    </label>
                    <div className='flex-offer-col ga-5'>
                        <input className='form-input profile__input' name="image" value={newAvatar} onChange={(e) => setNewAvatar  (e.target.value)}/>
                        {errors.avatar && <p className='form-text-danger'>{errors.avatar}</p>}
                    </div>
                </div>
                <div className='form-input-offer profile__input-offer'>
                    <label htmlFor="name" className='form-label'>
                        Name:
                    </label>
                    <div className='flex-offer-col ga-5'>
                        <input className='form-input profile__input' name="name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
                        {errors.name && <p className='form-text-danger'>{errors.name}</p>}
                    </div>
                    
                </div>
                <div className='form-input-offer profile__input-offer'>
                    <label htmlFor="email" className='form-label'>
                        Email:
                    </label>
                    <div className='flex-offer-col ga-5'>
                        <input className='form-input profile__input' name="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                        {errors.email && <p className='form-text-danger'>{errors.email}</p>}
                    </div>
                </div>
                <div className='form-input-offer profile__input-offer'>
                    <label htmlFor="password" className='form-label'>
                        Current password:
                    </label>
                    <div className='flex-offer-col ga-5'>
                        <input className='form-input profile__input' name="current_password" type='password' onChange={(e) => setOldPassword(e.target.value)}/>
                        {errors.oldPassword && <p className='form-text-danger'>{errors.oldPassword}</p>}
                    </div>
                    
                </div>
                <div className='form-input-offer profile__input-offer'>
                    <label htmlFor="password" className='form-label'>
                        New password:
                    </label>
                    <div className='flex-offer-col ga-5'>
                        <input className='form-input profile__input' name="new_password" onChange={(e) => setNewPassword(e.target.value)}/>
                        {errors.newPassword && <p className='form-text-danger'>{errors.newPassword}</p>}
                    </div>
                </div>
                <button className='button profile__submit'>
                    Change
                </button>
            </form>
            
        </div>
    )
}

export default ProfileCard;