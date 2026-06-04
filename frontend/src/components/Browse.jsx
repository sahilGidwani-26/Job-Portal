import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] pt-8 pb-20 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors duration-200 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <Search className="h-5 w-5 text-purple-300" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white">Search Results</h1>
                            <p className="text-white/50 text-sm mt-0.5">
                                {allJobs.length} {allJobs.length === 1 ? 'job' : 'jobs'} found
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 -mt-10 pb-16">
                {allJobs.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-24 flex flex-col items-center justify-center text-center">
                        <div className="h-20 w-20 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                            <Briefcase className="h-10 w-10 text-[#6A38C2]" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500 mb-6">Try searching with different keywords</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                        >
                            Go to Home
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allJobs.map((job, i) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.06 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse