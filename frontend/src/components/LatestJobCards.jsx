import React from 'react'
import { MapPin, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300 relative overflow-hidden"
        >
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A38C2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
                {/* Company */}
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="font-bold text-gray-900 text-base">{job?.company?.name}</h2>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                            <MapPin className="h-3 w-3" />
                            <span>India</span>
                        </div>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:bg-[#6A38C2] transition-colors duration-300">
                        <ArrowRight className="h-4 w-4 text-[#6A38C2] group-hover:text-white transition-colors duration-300" />
                    </div>
                </div>

                {/* Title & description */}
                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-[#6A38C2] transition-colors duration-200">{job?.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">{job?.description}</p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">{job?.position} Positions</span>
                    <span className="px-3 py-1 rounded-full bg-orange-50 text-[#F83002] text-xs font-semibold">{job?.jobType}</span>
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-[#6A38C2] text-xs font-semibold">{job?.salary} LPA</span>
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards