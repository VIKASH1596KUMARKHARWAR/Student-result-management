import React from "react";
import CustomInput from "../components/CustomInput";

const ResetPassword = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPassword = e.target.newPassword.value; // Accessing new password input value
        const confirmPassword = e.target.confirmPassword.value; // Accessing confirm password input value
        console.log("New Password:", newPassword);
        console.log("Confirm Password:", confirmPassword);
        // Simulate further actions (like navigation or confirmation message)
    };

    return (
        <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Reset Password</h3>
                <p className="text-center">Please enter your new password.</p>
                <form onSubmit={handleSubmit}>
                    <CustomInput type="password" label="New Password" id="newPassword" name="newPassword" />
                    <CustomInput type="password" label="Confirm Password" id="confirmPassword" name="confirmPassword" />
                    <button
                        className="border-0 px-3 py-2 text-white fw-bold w-100"
                        style={{ background: "#ffd333" }}
                        type="submit"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
