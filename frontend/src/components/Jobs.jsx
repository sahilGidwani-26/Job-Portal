import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, SlidersHorizontal, X } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Page header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">
                            Find Your <span className="text-[#6A38C2]">Dream Job</span>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {filterJobs.length} jobs found{searchedQuery ? ` for "${searchedQuery}"` : ''}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 hover:border-[#6A38C2] hover:text-[#6A38C2] font-semibold text-gray-700 transition-all duration-200 md:hidden"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar — desktop */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="sticky top-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4 text-[#6A38C2]" />
                                    Filter Jobs
                                </h2>
                            </div>
                            <FilterCard />
                        </div>
                    </aside>

                    {/* Mobile filter drawer */}
                    <AnimatePresence>
                        {showFilter && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 md:hidden"
                            >
                                <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilter(false)} />
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '-100%' }}
                                    transition={{ type: 'spring', damping: 25 }}
                                    className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
                                >
                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                        <h2 className="font-bold text-gray-900">Filter Jobs</h2>
                                        <button onClick={() => setShowFilter(false)} className="p-1 rounded-lg hover:bg-gray-100">
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <FilterCard />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Job listings */}
                    <div className="flex-1">
                        {filterJobs.length <= 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="h-20 w-20 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                                    <Briefcase className="h-10 w-10 text-[#6A38C2]" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                                <p className="text-gray-500">Try adjusting your search or filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                                <AnimatePresence>
                                    {filterJobs.map((job, i) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs