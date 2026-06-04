import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { ArrowLeft, Users } from 'lucide-react';

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">
                                Applicants
                                <span className="ml-3 text-lg font-bold text-purple-300">
                                    ({applicants?.applications?.length || 0})
                                </span>
                            </h1>
                            <p className="text-white/50 text-sm mt-0.5">Review and shortlist candidates</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-10 pb-16">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <ApplicantsTable />
                </div>
            </div>
        </div>
    )
}

export default Applicants