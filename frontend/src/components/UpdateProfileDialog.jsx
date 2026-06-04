import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Loader2, User, Mail, Phone, FileText, AlignLeft, Sparkles, Upload } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const InputField = ({ icon: Icon, label, id, ...props }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 text-[#6A38C2]" />
            {label}
        </label>
        <input
            id={id}
            {...props}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white"
        />
    </div>
)

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [fileName, setFileName] = useState(user?.profile?.resumeOriginalName || '');

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: user?.profile?.resume || ""
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setInput({ ...input, file });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent
                className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl border-0 shadow-2xl"
                onInteractOutside={() => setOpen(false)}
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-black text-lg">Update Profile</DialogTitle>
                            <p className="text-white/50 text-xs mt-0.5">Keep your information up to date</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={submitHandler} className="px-8 py-6 space-y-4">
                    <InputField
                        icon={User}
                        label="Full Name"
                        id="fullname"
                        name="fullname"
                        type="text"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        placeholder="Your full name"
                    />
                    <InputField
                        icon={Mail}
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="your@email.com"
                    />
                    <InputField
                        icon={Phone}
                        label="Phone Number"
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="+91 XXXXX XXXXX"
                    />
                    <InputField
                        icon={AlignLeft}
                        label="Bio"
                        id="bio"
                        name="bio"
                        type="text"
                        value={input.bio}
                        onChange={changeEventHandler}
                        placeholder="A short bio about yourself"
                    />
                    <InputField
                        icon={Sparkles}
                        label="Skills (comma separated)"
                        id="skills"
                        name="skills"
                        type="text"
                        value={input.skills}
                        onChange={changeEventHandler}
                        placeholder="React, Node.js, Python..."
                    />

                    {/* File upload */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-[#6A38C2]" />
                            Resume (PDF)
                        </label>
                        <label
                            htmlFor="file"
                            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#6A38C2] cursor-pointer transition-colors duration-200 bg-gray-50 hover:bg-purple-50 group"
                        >
                            <Upload className="h-5 w-5 text-gray-400 group-hover:text-[#6A38C2] transition-colors" />
                            <span className="text-sm text-gray-500 group-hover:text-[#6A38C2] transition-colors truncate">
                                {fileName || 'Click to upload PDF'}
                            </span>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="sr-only"
                            />
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-base hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Saving changes...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog