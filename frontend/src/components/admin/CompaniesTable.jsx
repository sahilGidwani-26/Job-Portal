import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, Building2, Calendar, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filtered);
    }, [companies, searchCompanyByText]);

    if (!filterCompany || filterCompany.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
                    <Building2 className="h-8 w-8 text-[#6A38C2]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">No companies found</h3>
                <p className="text-gray-400 text-sm">
                    {searchCompanyByText ? `No results for "${searchCompanyByText}"` : 'Register your first company to get started'}
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            {/* Table header */}
            <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-100">
                <div className="col-span-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Logo</div>
                <div className="col-span-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Company Name</div>
                <div className="col-span-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Registered On</div>
                <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-50">
                {filterCompany.map((company) => (
                    <div
                        key={company._id}
                        className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50/80 transition-colors duration-150 group"
                    >
                        {/* Logo */}
                        <div className="col-span-1">
                            <div className="h-10 w-10 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 flex items-center justify-center">
                                {company.logo ? (
                                    <Avatar className="h-10 w-10 rounded-none">
                                        <AvatarImage src={company.logo} className="object-cover" />
                                    </Avatar>
                                ) : (
                                    <Building2 className="h-5 w-5 text-[#6A38C2]" />
                                )}
                            </div>
                        </div>

                        {/* Name */}
                        <div className="col-span-5">
                            <p className="font-bold text-gray-900 group-hover:text-[#6A38C2] transition-colors duration-150">{company.name}</p>
                            {company.location && (
                                <p className="text-gray-400 text-xs mt-0.5">{company.location}</p>
                            )}
                        </div>

                        {/* Date */}
                        <div className="col-span-4">
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                <Calendar className="h-3.5 w-3.5" />
                                {company.createdAt.split("T")[0]}
                            </div>
                        </div>

                        {/* Action */}
                        <div className="col-span-2 flex justify-end">
                            <button
                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-[#6A38C2] hover:text-[#6A38C2] hover:bg-purple-50 transition-all duration-200"
                            >
                                <Edit2 className="h-3.5 w-3.5" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    Showing {filterCompany.length} {filterCompany.length === 1 ? 'company' : 'companies'}
                </p>
            </div>
        </div>
    )
}

export default CompaniesTable