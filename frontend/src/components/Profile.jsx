import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Mail, Phone, FileText, Pencil, Star, Briefcase } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero banner */}
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] h-48 relative">
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-20 pb-16 relative z-10">
                {/* Profile card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="h-24 w-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                                <Avatar className="h-24 w-24 rounded-none">
                                    <AvatarImage
                                        src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                        alt="profile"
                                        className="object-cover"
                                    />
                                </Avatar>
                            </div>
                            <div className="absolute -bottom-2 -right-2 h-7 w-7 rounded-lg bg-green-400 border-2 border-white flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white" />
                            </div>
                        </div>

                        {/* Name & bio */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-black text-gray-900">{user?.fullname}</h1>
                            {user?.profile?.bio && (
                                <p className="text-gray-500 mt-1">{user?.profile?.bio}</p>
                            )}
                        </div>

                        {/* Edit button */}
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#a855f7] text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-7" />

                    {/* Contact info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <Mail className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Email</p>
                                <p className="text-gray-900 font-semibold text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                                <Phone className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">Phone</p>
                                <p className="text-gray-900 font-semibold text-sm">{user?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-7">
                        <div className="flex items-center gap-2 mb-3">
                            <Star className="h-4 w-4 text-[#6A38C2]" />
                            <h2 className="font-bold text-gray-900">Skills</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {user?.profile?.skills?.length ? (
                                user.profile.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-50 to-purple-100 text-[#6A38C2] text-sm font-semibold border border-purple-200"
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm italic">No skills added yet</span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className="h-4 w-4 text-[#6A38C2]" />
                            <h2 className="font-bold text-gray-900">Resume</h2>
                        </div>
                        {isResume && user?.profile?.resume ? (
                            <a
                                href={user.profile.resume}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#6A38C2]/30 bg-purple-50 text-[#6A38C2] font-semibold text-sm hover:bg-[#6A38C2] hover:text-white hover:border-[#6A38C2] transition-all duration-200"
                            >
                                <FileText className="h-4 w-4" />
                                {user.profile.resumeOriginalName || 'View Resume'}
                            </a>
                        ) : (
                            <span className="text-gray-400 text-sm italic">No resume uploaded</span>
                        )}
                    </div>
                </div>

                {/* Applied jobs */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-[#6A38C2]" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900">Applied Jobs</h2>
                    </div>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile