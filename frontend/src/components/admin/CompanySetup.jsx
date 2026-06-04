import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Loader2, ArrowLeft, Building2, Globe, MapPin, AlignLeft, Upload, Image } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const InputField = ({ icon: Icon, label, id, iconColor = "text-[#6A38C2]", ...props }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
            <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
            {label}
        </label>
        <input
            id={id}
            {...props}
            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white"
        />
    </div>
)

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "", description: "", website: "", location: "", file: null
    });
    const [fileName, setFileName] = useState('');
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setInput({ ...input, file });
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) formData.append("file", input.file);

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-10 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate("/admin/companies")}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Companies
                    </button>
                    <div className="flex items-center gap-4">
                        {/* Company logo preview */}
                        <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                            {singleCompany?.logo ? (
                                <img src={singleCompany.logo} alt="logo" className="h-full w-full object-cover" />
                            ) : (
                                <Building2 className="h-7 w-7 text-purple-300" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">{singleCompany?.name || 'Company Setup'}</h1>
                            <p className="text-white/50 text-sm mt-0.5">Update your company profile</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form card */}
            <div className="max-w-3xl mx-auto px-4 mt-8 pb-16">
                <form onSubmit={submitHandler}>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Section: Basic Info */}
                        <div className="px-8 pt-8 pb-6">
                            <h2 className="font-black text-gray-900 text-base mb-5 flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-[#6A38C2]" />
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField
                                    icon={Building2}
                                    label="Company Name"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    placeholder="Company name"
                                />
                                <InputField
                                    icon={Globe}
                                    label="Website"
                                    id="website"
                                    name="website"
                                    type="text"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://yourcompany.com"
                                    iconColor="text-blue-500"
                                />
                                <InputField
                                    icon={MapPin}
                                    label="Location"
                                    id="location"
                                    name="location"
                                    type="text"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="City, Country"
                                    iconColor="text-orange-500"
                                />
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
                                        <AlignLeft className="h-3.5 w-3.5 text-green-500" />
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        placeholder="Briefly describe your company..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 mx-8" />

                        {/* Section: Logo */}
                        <div className="px-8 py-6">
                            <h2 className="font-black text-gray-900 text-base mb-5 flex items-center gap-2">
                                <Image className="h-4 w-4 text-[#6A38C2]" />
                                Company Logo
                            </h2>
                            <label
                                htmlFor="logo-file"
                                className="flex items-center gap-4 w-full px-5 py-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#6A38C2] cursor-pointer transition-colors duration-200 bg-gray-50 hover:bg-purple-50 group"
                            >
                                <div className="h-10 w-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 group-hover:border-purple-200">
                                    <Upload className="h-5 w-5 text-gray-400 group-hover:text-[#6A38C2] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-600 group-hover:text-[#6A38C2] transition-colors">
                                        {fileName || 'Click to upload logo'}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, SVG up to 5MB</p>
                                </div>
                                <input
                                    id="logo-file"
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="sr-only"
                                />
                            </label>
                        </div>

                        {/* Footer actions */}
                        <div className="px-8 pb-8 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/companies")}
                                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                                ) : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetup