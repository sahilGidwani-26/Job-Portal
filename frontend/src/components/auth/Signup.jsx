import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, Upload, Sparkles } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({ fullname: "", email: "", phoneNumber: "", password: "", role: "", file: "" });
    const [fileName, setFileName] = useState('');
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) { setFileName(file.name); setInput({ ...input, file }); }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) formData.append("file", input.file);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => { if (user) navigate("/"); }, [])

    const fields = [
        { name: 'fullname', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', icon: Mail },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: '9876543210', icon: Phone },
        { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••', icon: Lock },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-purple-300 text-sm font-medium mb-4">
                            <Sparkles className="h-3.5 w-3.5" />
                            Join JobPortal
                        </div>
                        <h1 className="text-3xl font-black text-white">Create Account</h1>
                        <p className="text-white/50 text-sm mt-2">Start your journey today</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <form onSubmit={submitHandler} className="space-y-4">
                            {/* Input fields */}
                            {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
                                <div key={name} className="space-y-1.5">
                                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                        <Icon className="h-3.5 w-3.5 text-[#6A38C2]" /> {label}
                                    </Label>
                                    <Input
                                        type={type}
                                        name={name}
                                        value={input[name]}
                                        onChange={changeEventHandler}
                                        placeholder={placeholder}
                                        className="rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] bg-gray-50 focus:bg-white h-11"
                                    />
                                </div>
                            ))}

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

                            {/* Profile photo */}
                            <div className="space-y-1.5">
                                <Label className="text-sm font-bold text-gray-700">Profile Photo</Label>
                                <label
                                    htmlFor="profile-file"
                                    className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#6A38C2] cursor-pointer transition-colors bg-gray-50 hover:bg-purple-50 group"
                                >
                                    <Upload className="h-4 w-4 text-gray-400 group-hover:text-[#6A38C2] flex-shrink-0 transition-colors" />
                                    <span className="text-sm text-gray-500 group-hover:text-[#6A38C2] truncate transition-colors">
                                        {fileName || 'Click to upload photo'}
                                    </span>
                                    <input id="profile-file" type="file" accept="image/*" onChange={changeFileHandler} className="sr-only" />
                                </label>
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-70 mt-2"
                            >
                                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : 'Create Account →'}
                            </Button>

                            <p className="text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#6A38C2] font-semibold hover:underline">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup