import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, Sparkles } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => { if (user) navigate("/"); }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-sm font-medium mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Welcome Back
                        </div>
                        <h1 className="text-3xl font-black text-white">Login to JobPortal</h1>
                        <p className="text-white/50 text-sm mt-2">Your dream job is waiting</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <form onSubmit={submitHandler} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <Label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Mail className="h-3.5 w-3.5 text-[#6A38C2]" /> Email
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="you@example.com"
                                    className="rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] bg-gray-50 focus:bg-white h-11"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <Label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                    <Lock className="h-3.5 w-3.5 text-[#6A38C2]" /> Password
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] bg-gray-50 focus:bg-white h-11"
                                />
                            </div>

                            {/* Role */}
                            <div className="space-y-2">
                                <Label className="text-sm font-bold text-gray-700">I am a</Label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['student', 'recruiter'].map(role => (
                                        <label
                                            key={role}
                                            className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                                input.role === role
                                                    ? 'border-[#6A38C2] bg-purple-50 text-[#6A38C2]'
                                                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="role"
                                                value={role}
                                                checked={input.role === role}
                                                onChange={changeEventHandler}
                                                className="sr-only"
                                            />
                                            <span className="text-sm font-semibold capitalize">{role}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-70 mt-2"
                            >
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Login →'}
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-[#6A38C2] font-semibold hover:underline">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login