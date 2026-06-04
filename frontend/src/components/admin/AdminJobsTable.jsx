import React, { useEffect, useState } from 'react'
import { Edit2, Eye, Calendar, Building2, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
        setFilterJobs(filtered);
    }, [allAdminJobs, searchJobByText]);

    if (!filterJobs || filterJobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-[#6A38C2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No jobs found</h3>
                <p className="text-gray-400 text-sm">
                    {searchJobByText ? `No results for "${searchJobByText}"` : 'Post your first job to get started'}
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Company</div>
                <div className="col-span-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</div>
                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Posted On</div>
                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50">
                {filterJobs.map((job) => (
                    <div
                        key={job._id}
                        className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50/80 transition-colors duration-150 group"
                    >
                        {/* Company */}
                        <div className="col-span-3 flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 flex items-center justify-center flex-shrink-0">
                                <Building2 className="h-4 w-4 text-[#6A38C2]" />
                            </div>
                            <span className="font-semibold text-gray-700 text-sm truncate">{job?.company?.name}</span>
                        </div>

                        {/* Role */}
                        <div className="col-span-4">
                            <p className="font-bold text-gray-900 group-hover:text-[#6A38C2] transition-colors duration-150 text-sm">{job?.title}</p>
                            {job?.location && (
                                <p className="text-gray-400 text-xs mt-0.5">{job.location}</p>
                            )}
                        </div>

                        {/* Date */}
                        <div className="col-span-3">
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <Calendar className="h-3.5 w-3.5" />
                                {job?.createdAt?.split("T")[0]}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <button
                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                className="p-2 rounded-lg border-2 border-gray-200 text-gray-500 hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-purple-50 transition-all duration-200"
                                title="Edit"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                className="p-2 rounded-lg border-2 border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                title="View Applicants"
                            >
                                <Eye className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    Showing {filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'}
                </p>
            </div>
        </div>
    )
}

export default AdminJobsTable