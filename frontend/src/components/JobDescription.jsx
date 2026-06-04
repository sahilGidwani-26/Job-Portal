import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import {
    ArrowLeft, MapPin, Briefcase, DollarSign, Clock,
    Users, Calendar, Building2, CheckCircle2, Send
} from 'lucide-react';

const DetailRow = ({ icon: Icon, label, value, iconColor = "text-[#6A38C2]" }) => (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
        <div className={`h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div className="flex-1">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-gray-900 font-semibold mt-0.5">{value}</p>
        </div>
    </div>
);

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(app => app.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(app => app.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-24 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors duration-200 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Jobs
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                                {singleJob?.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold border border-blue-500/30">
                                    {singleJob?.position} Positions
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold border border-orange-500/30">
                                    {singleJob?.jobType}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold border border-purple-500/30">
                                    {singleJob?.salary} LPA
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all duration-200 flex-shrink-0 ${isApplied
                                ? 'bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105'
                                }`}
                        >
                            {isApplied ? (
                                <>
                                    <CheckCircle2 className="h-5 w-5" />
                                    Already Applied
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    Apply Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 -mt-14 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left: Description */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* About the role */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Briefcase className="h-4 w-4 text-[#6A38C2]" />
                                </div>
                                About the Role
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-base">
                                {singleJob?.description}
                            </p>
                        </div>

                        {/* Job details */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
                                <div className="h-7 w-7 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Building2 className="h-4 w-4 text-[#6A38C2]" />
                                </div>
                                Job Details
                            </h2>
                            <div>
                                <DetailRow icon={Briefcase} label="Role" value={singleJob?.title} />
                                <DetailRow icon={MapPin} label="Location" value={singleJob?.location} iconColor="text-blue-500" />
                                <DetailRow icon={Clock} label="Experience Required" value={`${singleJob?.experience} years`} iconColor="text-orange-500" />
                                <DetailRow icon={DollarSign} label="Salary" value={`${singleJob?.salary} LPA`} iconColor="text-green-500" />
                                <DetailRow icon={Users} label="Total Applicants" value={singleJob?.applications?.length} iconColor="text-pink-500" />
                                <DetailRow icon={Calendar} label="Posted Date" value={singleJob?.createdAt?.split("T")[0]} iconColor="text-indigo-500" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Apply card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <div className="text-center mb-6">
                                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                                    <Building2 className="h-8 w-8 text-[#6A38C2]" />
                                </div>
                                <h3 className="font-black text-gray-900 text-lg">{singleJob?.company?.name}</h3>
                                <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mt-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    <span>{singleJob?.location || 'India'}</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50">
                                    <span className="text-gray-500 text-sm">Positions</span>
                                    <span className="font-bold text-blue-700 text-sm">{singleJob?.position}</span>
                                </div>
                                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50">
                                    <span className="text-gray-500 text-sm">Job Type</span>
                                    <span className="font-bold text-[#F83002] text-sm">{singleJob?.jobType}</span>
                                </div>
                                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50">
                                    <span className="text-gray-500 text-sm">Salary</span>
                                    <span className="font-bold text-[#6A38C2] text-sm">{singleJob?.salary} LPA</span>
                                </div>
                                <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-gray-50">
                                    <span className="text-gray-500 text-sm">Applicants</span>
                                    <span className="font-bold text-gray-900 text-sm">{singleJob?.applications?.length}</span>
                                </div>
                            </div>

                            <button
                                onClick={isApplied ? null : applyJobHandler}
                                disabled={isApplied}
                                className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 ${isApplied
                                    ? 'bg-green-50 text-green-600 border-2 border-green-200 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white hover:shadow-lg hover:shadow-purple-500/30'
                                    }`}
                            >
                                {isApplied ? (
                                    <><CheckCircle2 className="h-5 w-5" /> Applied Successfully</>
                                ) : (
                                    <><Send className="h-5 w-5" /> Apply Now</>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JobDescription