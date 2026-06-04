import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="bg-gray-50 py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <div className="flex items-center gap-2 text-[#6A38C2] font-semibold text-sm mb-2">
                            <Briefcase className="h-4 w-4" />
                            FRESH OPPORTUNITIES
                        </div>
                        <h2 className="text-4xl font-black text-gray-900">
                            Latest & Top{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#a855f7]">
                                Job Openings
                            </span>
                        </h2>
                    </div>
                    <a href="/jobs" className="hidden md:flex items-center gap-2 text-[#6A38C2] font-semibold hover:underline">
                        View all jobs →
                    </a>
                </div>

                {allJobs.length <= 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                            <Briefcase className="h-8 w-8 text-[#6A38C2]" />
                        </div>
                        <p className="text-gray-500 font-medium">No jobs available right now. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allJobs.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestJobs