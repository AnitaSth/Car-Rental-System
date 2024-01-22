import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { AuthContext } from "../context/authContext";

const AuthProvider = ({ children }) => {
    const storedUser = localStorage.getItem("user");
    const [state, dispatch] = useReducer(authReducer, {
        user: storedUser ? JSON.parse(storedUser) : null,
    });

    return (
        <AuthContext.Provider value={{ user: state.user, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
