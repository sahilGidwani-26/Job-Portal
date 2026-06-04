import React from 'react'
import { MoreHorizontal, FileText, Users, CheckCircle, XCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const statusConfig = {
    Accepted: { color: "text-green-600", bg: "bg-green-50 hover:bg-green-100 border-green-200", icon: CheckCircle },
    Rejected: { color: "text-red-600", bg: "bg-red-50 hover:bg-red-100 border-red-200", icon: XCircle },
};

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Status update failed');
        }
    }

    if (!applicants?.applications?.length) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-[#6A38C2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No applicants yet</h3>
                <p className="text-gray-400 text-sm">Candidates who apply will appear here</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            {/* Header */}
            <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100 min-w-[700px]">
                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Applicant</div>
                <div className="col-span-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Contact</div>
                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Resume</div>
                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Applied On</div>
                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50 min-w-[700px]">
                {applicants.applications.map((item) => (
                    <div key={item._id} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50/80 transition-colors duration-150 group">
                        {/* Name */}
                        <div className="col-span-3">
                            <div className="flex items-center gap-2.5">
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0 text-[#6A38C2] font-black text-sm">
                                    {item?.applicant?.fullname?.[0]?.toUpperCase() || '?'}
                                </div>
                                <p className="font-bold text-gray-900 text-sm">{item?.applicant?.fullname}</p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="col-span-3">
                            <p className="text-gray-700 text-sm truncate">{item?.applicant?.email}</p>
                            <p className="text-gray-400 text-xs mt-0.5">{item?.applicant?.phoneNumber}</p>
                        </div>

                        {/* Resume */}
                        <div className="col-span-2">
                            {item?.applicant?.profile?.resume ? (
                                <a
                                    href={item.applicant.profile.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[#6A38C2] text-xs font-semibold hover:underline"
                                >
                                    <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                                    <span className="truncate">{item.applicant.profile.resumeOriginalName || 'View'}</span>
                                </a>
                            ) : (
                                <span className="text-gray-400 text-xs">Not uploaded</span>
                            )}
                        </div>

                        {/* Date */}
                        <div className="col-span-2">
                            <span className="text-gray-500 text-sm">{item?.applicant?.createdAt?.split("T")[0]}</span>
                        </div>

                        {/* Status actions */}
                        <div className="col-span-2 flex items-center justify-end gap-1.5">
                            {shortlistingStatus.map((status) => {
                                const cfg = statusConfig[status];
                                const Icon = cfg.icon;
                                return (
                                    <button
                                        key={status}
                                        onClick={() => statusHandler(status, item._id)}
                                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all duration-200 ${cfg.bg} ${cfg.color}`}
                                    >
                                        <Icon className="h-3 w-3" />
                                        {status}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    {applicants.applications.length} total applicant{applicants.applications.length !== 1 ? 's' : ''}
                </p>
            </div>
        </div>
    )
}

export default ApplicantsTable