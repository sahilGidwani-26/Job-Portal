import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus, Briefcase } from 'lucide-react'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Briefcase className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Posted Jobs</h1>
                            <p className="text-white/50 text-sm mt-0.5">Manage your job listings</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 self-start sm:self-auto"
                    >
                        <Plus className="h-4 w-4" />
                        New Job
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 -mt-10 pb-16">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                placeholder="Filter by title or company..."
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-sm transition-colors duration-200 bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>
                    <AdminJobsTable />
                </div>
            </div>
        </div>
    )
}

export default AdminJobs