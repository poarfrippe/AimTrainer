import {useState, useEffect} from 'react'

const useForm=(callback, validateInfo) =>{
    const [values, setValues]=useState({
        username: "",
        email: "",
        password: "",
        password2:""
    });
    const [errors, setErrors]=useState({});
    const [isSubmitting, setIsSubmitting]=useState(false)

    const handleChange= e=>{
        const{name, value}=e.target
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit= e=>{
        e.preventDefault();

        let username = e.target.username.value
        localStorage.setItem("username", username);

        let email = e.target.email.value
        let password = e.target.password.value

        //mocht no faxen...
        fetch("http://89.107.108.231:18781/register", {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': username, 'email': email, 'password': password})
        }).then(function (response) {
            return response.text()
        }).then(function (text){
            console.log("response vom post: " + text)
        }).catch(function (error) {
            console.log(error)
        })

        setErrors(validateInfo(values))
        //setIsSubmitting(true);
    }

    useEffect(()=>{
        if(Object.keys(errors).length===0 && isSubmitting){
            callback();
        }
    }, [errors]
    );

    return {handleChange, values, handleSubmit, errors};
};

export default useForm;
