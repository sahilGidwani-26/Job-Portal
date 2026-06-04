import React, { useState } from 'react'
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
            <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#6A38C2]/20 blur-[80px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#F83002]/15 blur-[60px] sm:blur-[100px] translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 left-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-purple-500/10 blur-[60px] sm:blur-[80px] -translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 text-center px-5 sm:px-8 max-w-4xl mx-auto w-full py-16 sm:py-0">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#F83002] font-semibold text-xs sm:text-sm mb-6 sm:mb-8 animate-pulse">
                    <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    No. 1 Job Hunt Website
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-4 sm:mb-6 tracking-tight">
                    Search, Apply &
                    <br />
                    Get Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#a855f7]">
                        Dream Jobs
                    </span>
                </h1>

                <p className="text-white/60 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
                    Connect with top companies. Find opportunities that match your skills and ambitions.
                </p>

                {/* Search bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-2xl mx-auto gap-3 sm:gap-0 sm:bg-white/10 sm:backdrop-blur-md sm:border sm:border-white/20 sm:rounded-2xl sm:px-4 sm:py-2 sm:shadow-2xl sm:focus-within:border-[#6A38C2] transition-all duration-300">
                    {/* Mobile: separate input + button | Desktop: inline */}
                    <div className="flex items-center flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 sm:py-0 sm:bg-transparent sm:border-0 sm:rounded-none sm:px-0">
                        <Search className="h-5 w-5 text-white/40 mr-3 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, company, or keyword..."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-base py-0 sm:py-2"
                        />
                    </div>
                    <button
                        onClick={searchJobHandler}
                        className="w-full sm:w-auto bg-gradient-to-r from-[#6A38C2] to-[#a855f7] hover:from-[#5a28b2] hover:to-[#9845e7] text-white px-6 py-3 sm:py-2.5 rounded-2xl sm:rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex-shrink-0"
                    >
                        Search
                    </button>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10 sm:mt-14 text-white/60 text-xs sm:text-sm">
                    {[['10K+', 'Jobs Posted'], ['5K+', 'Companies'], ['50K+', 'Job Seekers']].map(([num, label]) => (
                        <div key={label} className="text-center">
                            <div className="text-xl sm:text-2xl font-black text-white">{num}</div>
                            <div>{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HeroSection