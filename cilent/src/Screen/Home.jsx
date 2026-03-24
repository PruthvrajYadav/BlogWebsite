import { useEffect, useState } from 'react';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Services from '../Components/Services';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BlogCardSkeleton } from '../Component/Skeleton';
import api from '../utils/api';
import BlogCard from '../Components/BlogCard';

const Home = () => {
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const res = await api.get(`/blog?limit=3`);
                if (res.data.data && res.data.data.length > 0) {
                    setRecentBlogs(res.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecent();
    }, []);

    return (
        <main className="pt-20">
            <Hero />

            {/* Recent Stories Section */}
            <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-4xl font-black tracking-tighter">Recent <span className="gradient-text">Stories</span></h2>
                    <Link to="/blog" className="flex items-center gap-2 text-brand-primary font-bold hover:gap-3 transition-all">
                        <span>View All</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        [1, 2, 3].map(i => <BlogCardSkeleton key={i} />)
                    ) : recentBlogs.length > 0 ? (
                        recentBlogs.map(blog => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 glass rounded-[2rem] text-gray-500 font-medium">
                            No stories published yet. Stay tuned!
                        </div>
                    )}
                </div>
            </section>

            <About />
            <Services />
        </main>
    );
};

export default Home;
