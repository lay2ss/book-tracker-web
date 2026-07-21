import React, { useEffect } from 'react';
import Alert, { type AlertColor } from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";

interface SimpleAlertProps {
    severity: AlertColor; 
    message: string;
    onClose?: () => void;
    goTo?: any;
}

const SimpleAlert: React.FC<SimpleAlertProps> = ({ severity, message, onClose, goTo }) => {
    const navigate = useNavigate();
    useEffect(() => {

    if (!onClose) return;

    const timer = setTimeout(() => {
        onClose();
        navigate(goTo);
    }, 5000);

    return () => clearTimeout(timer);
    }, [onClose]); 

    return (
    <div  className='absolute max-w-120 w-full top-0 p-5 left-1/2 transform -translate-x-1/2 z-20'>
        <Alert severity={severity} onClose={onClose}>
            {message}
        </Alert>
    </div>
    );
};

export default SimpleAlert;