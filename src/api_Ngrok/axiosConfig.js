import axios from 'axios';

export default axios.create({
    baseURL:"https://19cf-217-27-204-170.ngrok-free.app",
    headers: {"ngrok-skip-browser-warning": "true"}
    
});