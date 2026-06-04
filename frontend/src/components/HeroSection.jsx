import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] min-h-[88vh] flex items-center justify-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#6A38C2]/20 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#F83002]/15 blur-[100px] translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px] -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#F83002] font-semibold text-sm mb-8 animate-pulse">
                    <Sparkles className="h-4 w-4" />
                    No. 1 Job Hunt Website
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                    Search, Apply &
                    <br />
                    Get Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#a855f7]">
                        Dream Jobs
                    </span>
                </h1>

                <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                    Connect with top companies. Find opportunities that match your skills and ambitions.
                </p>

                {/* Search bar */}
                <div className="flex items-center w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 shadow-2xl focus-within:border-[#6A38C2] transition-all duration-300">
                    <Search className="h-5 w-5 text-white/40 mr-3 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Job title, company, or keyword..."
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-base py-2"
                    />
                    <button
                        onClick={searchJobHandler}
                        className="bg-gradient-to-r from-[#6A38C2] to-[#a855f7] hover:from-[#5a28b2] hover:to-[#9845e7] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex-shrink-0"
                    >
                        Search
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-10 mt-14 text-white/60 text-sm">
                    {[['10K+', 'Jobs Posted'], ['5K+', 'Companies'], ['50K+', 'Job Seekers']].map(([num, label]) => (
                        <div key={label} className="text-center">
                            <div className="text-2xl font-black text-white">{num}</div>
                            <div>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection