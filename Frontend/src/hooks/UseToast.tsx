import {useState} from 'react'

export const UseToast = () => {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    const displayToast = (msg: string, duration:number) => {
        setMessage(msg);
        setShowToast(true);

        setTimeout(() => setShowToast(false), duration);
    }

    return {showToast, message, displayToast}
}