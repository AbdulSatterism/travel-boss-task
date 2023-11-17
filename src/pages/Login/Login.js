import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [error, setError] = useState('');
    const { signIn, setLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = data => {

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setError('');
                // varify okk
                if (user.emailVerified) {
                    navigate(from, { replace: true })
                }
                else {
                    alert.error('your email is not varifiyed ! please verify')
                }
            })
            .catch(error => {
                console.log(error)
                setError(error.message)
            })
            .finally(() => {
                setLoading(false)
            })

    }

    return (
        <div className='h-[800px]  flex justify-center items-center'>
            <div className='w-96 shadow-xl bg-slate-300 rounded p-7'>
                <h2 className='text-xl text-center text-primary'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" className="w-full max-w-xs input input-bordered"
                            {...register("email", { required: "Email Address is required" })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="w-full max-w-xs form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" className="w-full max-w-xs input input-bordered"
                            {...register("password",
                                {
                                    required: "password is required",
                                    minLength: { value: 6, message: 'password must be 6 character or longer' }
                                },
                            )}
                        />
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                        <label className="label"><span className="label-text">Forget Password</span></label>
                    </div>

                    <input className='w-full btn btn-accent' value="Login" type="submit" />
                    <div>
                        {
                            error && <p className='text-red-600'>{error}</p>
                        }
                    </div>
                </form>
                <p>New to travel boss?<Link className='text-primary' to='/signup'>Create new account</Link></p>

            </div>
        </div>
    );
};

export default Login;