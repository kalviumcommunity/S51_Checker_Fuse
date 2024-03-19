import { useEffect, useState } from "react";
import Joi from "joi";
import "../Components/login.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";

function Login() {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        location: '',
        password: ''
    });

    const [formErrors, setFormErrors] = useState({});

    const formSchema = Joi.object({
        username: Joi.string().min(3).max(30).required(), // Changed from userusername to username
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        location: Joi.string().required()
    });

    useEffect(() => {
        // Check if user is already logged in
        const isLoggedIn = Cookies.get('isLoggedIn');
        if (isLoggedIn) {
            nav('/listofentities'); // Redirect to another page if logged in
        }
    }, [nav]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = formSchema.validate(formData, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach(detail => {
                errors[detail.context.key] = detail.message;
            });
            setFormErrors(errors);
        } else {
            try {
                // Form submission logic here    
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 2);
                const response = await axios.post("http://localhost:3000/login", formData);
                console.log(response)
                const { jwt } = response.data;
                document.cookie = `tokennn=${jwt}; path=/;`;
                nav(`/listofentities`);
            } catch (error) {
                console.log(error); // log the error response
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target; // Changed from username to name
        setFormData({
            ...formData,
            [name]: value // Changed from username to name
        });

        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    return (
        <div className="container"> {/* Changed classusername to className */}
            <form onSubmit={handleSubmit}>
                <div className="form-group"> {/* Changed classusername to className */}
                    <label>username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} /> {/* Changed username to name */}
                    {formErrors.username && <span className="error">{formErrors.username}</span>} {/* Changed classusername to className */}
                </div>
                <div className="form-group"> {/* Changed classusername to className */}
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} /> {/* Changed username to name */}
                    {formErrors.password && <span className="error">{formErrors.password}</span>} {/* Changed classusername to className */}
                </div>
                <div className="form-group"> {/* Changed classusername to className */}
                    <label>Location:</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} /> {/* Changed username to name */}
                    {formErrors.location && <span className="error">{formErrors.location}</span>} {/* Changed classusername to className */}
                </div>
                <button className="buttons" type="submit">Submit</button> {/* Changed classusername to className */}
            </form>
        </div>
    );
}

export default Login;
