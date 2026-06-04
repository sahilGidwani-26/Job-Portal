import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { ArrowLeft, Building2, Sparkles } from 'lucide-react'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Please enter a company name");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-10 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-2xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate("/admin/companies")}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Companies
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Register Company</h1>
                            <p className="text-white/50 text-sm mt-0.5">Start building your employer profile</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Card */}
            <div className="max-w-2xl mx-auto px-4 mt-8 pb-16">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-[#6A38C2]" />
                        </div>
                        <div>
                            <h2 className="font-black text-gray-900 text-lg">Company Name</h2>
                            <p className="text-gray-400 text-sm">You can change this later in settings</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        <label className="text-sm font-bold text-gray-700">
                            What's your company called?
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Google, Microsoft, Infosys..."
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && registerNewCompany()}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#6A38C2] focus:outline-none text-gray-900 text-base transition-colors duration-200 bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/admin/companies")}
                            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:border-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={registerNewCompany}
                            disabled={loading || !companyName.trim()}
                            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-bold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Continue →'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate