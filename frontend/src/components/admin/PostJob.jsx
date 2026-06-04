import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
    Loader2, ArrowLeft, Briefcase, AlignLeft, ListChecks,
    DollarSign, MapPin, Clock, Users, Building2, ChevronDown
} from 'lucide-react'

const InputField = ({ icon: Icon, label, iconColor = "text-[#6A38C2]", children, ...props }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-bold text-gray-700 flex items-center gap-1.5">
            <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
            {label}
        </label>
        {children || (
            <input
                {...props}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white"
            />
        )}
    </div>
)

const PostJob = () => {
    const [input, setInput] = useState({
        title: "", description: "", requirements: "",
        salary: "", location: "", jobType: "",
        experience: "", position: 0, companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(
            (company) => company.name.toLowerCase() === e.target.value
        );
        if (selectedCompany) setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validation
        if (!input.companyId) {
            toast.error("Please select a company first");
            return;
        }
        if (!input.title || !input.description || !input.salary || !input.location) {
            toast.error("Please fill all required fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            // Safe error handling — won't crash if response is undefined
            toast.error(error?.response?.data?.message || 'Failed to post job. Try again.');
        } finally {
            setLoading(false); // Always runs — fixes infinite loading bug
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-10 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/jobs")}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Jobs
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Post a New Job</h1>
                            <p className="text-white/50 text-sm mt-0.5">Fill in the details to attract the right candidates</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 pb-16">
                <form onSubmit={submitHandler}>
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Section 1: Job Info */}
                        <div className="px-8 pt-8 pb-6">
                            <h2 className="font-black text-gray-900 text-base mb-5 flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-[#6A38C2]" />
                                Job Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField icon={Briefcase} label="Job Title *" type="text" name="title" value={input.title} onChange={changeEventHandler} placeholder="e.g. Frontend Developer" />
                                <InputField icon={DollarSign} label="Salary (LPA) *" type="text" name="salary" value={input.salary} onChange={changeEventHandler} placeholder="e.g. 12" iconColor="text-green-500" />
                                <InputField icon={MapPin} label="Location *" type="text" name="location" value={input.location} onChange={changeEventHandler} placeholder="e.g. Bangalore" iconColor="text-orange-500" />
                                <InputField icon={Clock} label="Job Type" type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} placeholder="e.g. Full-time, Remote" iconColor="text-blue-500" />
                                <InputField icon={Clock} label="Experience (years)" type="text" name="experience" value={input.experience} onChange={changeEventHandler} placeholder="e.g. 2" iconColor="text-pink-500" />
                                <InputField icon={Users} label="No. of Positions" type="number" name="position" value={input.position} onChange={changeEventHandler} placeholder="0" iconColor="text-indigo-500" min="0" />
                            </div>
                        </div>

                        <div className="border-t border-gray-100 mx-8" />

                        {/* Section 2: Details */}
                        <div className="px-8 py-6">
                            <h2 className="font-black text-gray-900 text-base mb-5 flex items-center gap-2">
                                <AlignLeft className="h-4 w-4 text-[#6A38C2]" />
                                Job Details
                            </h2>
                            <div className="space-y-5">
                                <InputField icon={AlignLeft} label="Description *">
                                    <textarea
                                        name="description"
                                        value={input.description}
                                        onChange={changeEventHandler}
                                        placeholder="Describe the role, responsibilities, and what the candidate will work on..."
                                        rows={4}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                                    />
                                </InputField>
                                <InputField icon={ListChecks} label="Requirements" iconColor="text-orange-500">
                                    <textarea
                                        name="requirements"
                                        value={input.requirements}
                                        onChange={changeEventHandler}
                                        placeholder="List skills, qualifications, or experience required (comma-separated)..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white resize-none"
                                    />
                                </InputField>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 mx-8" />

                        {/* Section 3: Company */}
                        <div className="px-8 py-6">
                            <h2 className="font-black text-gray-900 text-base mb-5 flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-[#6A38C2]" />
                                Select Company
                            </h2>

                            {companies.length === 0 ? (
                                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
                                    <span className="text-red-500 text-xl">⚠️</span>
                                    <p className="text-sm text-red-600 font-semibold">
                                        No companies registered. <a href="/admin/companies/create" className="underline">Register a company</a> first before posting a job.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                    <select
                                        onChange={selectChangeHandler}
                                        defaultValue=""
                                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-sm transition-colors duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select a company</option>
                                        {companies.map((company) => (
                                            <option key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-8 pb-8 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/admin/jobs")}
                                className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || companies.length === 0}
                                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" /> Posting...</>
                                ) : '🚀 Post New Job'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostJob