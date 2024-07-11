import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

// CSS
import "./Login.css";

// Components
import Banner from "../../components/Banner/Banner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password,
        };

        const res = await login(user);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <>
            <Banner title="Iniciar sessão" />
            <section id="section-login">
                <div className="container">
                    <div className="block-wrap property-detail">
                        <h3 className="block-header">Login</h3>
                        <div className="block-content-wrap">
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        autoComplete="username"
                                        required
                                        value={email}
                                        onInput={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onInput={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="text-end">
                                    {!loading && (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Entrar
                                        </button>
                                    )}
                                    {loading && (
                                        <button
                                            className="btn btn-primary"
                                            disabled
                                        >
                                            Aguarde...
                                        </button>
                                    )}
                                </div>
                                {authError && (
                                    <p className="error">{authError}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
