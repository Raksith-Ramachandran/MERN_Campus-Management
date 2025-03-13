import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <Wrapper>
            <LogoutCard>
                <UserAvatar>{currentUser?.name?.charAt(0).toUpperCase()}</UserAvatar>
                <Username>{currentUser?.name}</Username>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonGroup>
                    <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                    <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                </ButtonGroup>
            </LogoutCard>
        </Wrapper>
    );
};

export default Logout;

// Styling

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
`;

const LogoutCard = styled.div`
    background-color: #fff;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    width: 400px;
    text-align: center;
    animation: fadeIn 0.6s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const UserAvatar = styled.div`
    width: 60px;
    height: 60px;
    background-color: #6a11cb;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px auto;
`;

const Username = styled.h2`
    font-size: 22px;
    color: #333;
    margin-bottom: 10px;
`;

const LogoutMessage = styled.p`
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
`;

const ButtonBase = styled.button`
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
`;

const LogoutButton = styled(ButtonBase)`
    background-color: #ff4d4d;
    color: white;

    &:hover {
        background-color: #e60000;
    }
`;

const CancelButton = styled(ButtonBase)`
    background-color: #ccc;
    color: black;

    &:hover {
        background-color: #999;
    }
`;
