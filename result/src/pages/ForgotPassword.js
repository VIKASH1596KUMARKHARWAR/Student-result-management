import React from "react";
import CustomInput from "../components/CustomInput";

const ForgotPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value; // Accessing the email input value
        console.log("Reset password link sent to:", email);
        // Simulate further actions (like navigation or confirmation message)
    };

    return (
        <div className="py-5" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
            <div className="my-5 w-25 mx-auto login-form p-4">
                <h3 className="text-center login-header">Forgot Password</h3>
                <p className="text-center">
                    Please enter your registered email to get a reset password email.
                </p>
                <form onSubmit={handleSubmit}>
                    <CustomInput
                        type="email"
                        label="Email Address"
                        id="email"
                        name="email"
                    />
                    <button
                        className="login-button w-100 text-center text-decoration-none fs-5"
                        type="submit"
                    >
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
