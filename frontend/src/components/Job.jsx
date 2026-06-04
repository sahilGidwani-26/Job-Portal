import React from 'react'
import { Bookmark, MapPin, Clock, Building2 } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const days = Math.floor(timeDifference / (1000 * 24 * 60 * 60));
        return days === 0 ? "Today" : `${days}d ago`;
    }

    return (
        <div className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6A38C2] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center overflow-hidden border border-purple-100">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={job?.company?.logo} />
                        </Avatar>
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-900 text-base leading-tight">{job?.company?.name}</h2>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                            <MapPin className="h-3 w-3" />
                            <span>India</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {daysAgoFunction(job?.createdAt)}
                    </span>
                    <button className="h-8 w-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-200 hover:text-purple-600 transition-colors duration-200">
                        <Bookmark className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Job title & description */}
            <div className="mb-4">
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#6A38C2] transition-colors duration-200">{job?.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{job?.description}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{job?.position} Positions</span>
                <span className="px-3 py-1 rounded-full bg-orange-50 text-[#F83002] text-xs font-semibold">{job?.jobType}</span>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6A38C2] text-xs font-semibold">{job?.salary} LPA</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-semibold hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200"
                >
                    View Details
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200">
                    Save for Later
                </button>
            </div>
        </div>
    )
}

export default Job