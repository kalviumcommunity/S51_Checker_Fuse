import { useEffect, useState } from "react";
import Joi from "joi";
import "../Components/login.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Login() {
    const [storedName, setStoredName] = useState('');
    const [storedPassword, setStoredPassword] = useState('');

    useEffect(() => {
        const name = Cookies.get('name');
        const password = Cookies.get('password');
        if (name && password) {
            setStoredName(name);
            setStoredPassword(password);
        }
    }, [])
    
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const formSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm password'),
        location: Joi.string().required()
    });

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = Cookies.get('isLoggedIn');
        if (isLoggedIn) {
            nav('/listofentities'); // Redirect to another page if logged in
        }
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error } = formSchema.validate(formData, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            setFormErrors(errors);
        } else {
            // Form submission logic here    
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 2);

            Cookies.set("name",formData.name, {expires: expirationDate});     
            Cookies.set('password', formData.password, {expires: expirationDate});  
        nav(`listofentities`)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    {formErrors.name && <span className="error">{formErrors.name}</span>}
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
                    {formErrors.password && <span className="error">{formErrors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} />
                    {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} />
                    {formErrors.location && <span className="error">{formErrors.location}</span>}
                </div>
                <button className="buttons" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
