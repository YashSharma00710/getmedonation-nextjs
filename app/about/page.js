import React from 'react'

const about = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-16">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        About Me
                    </h1>

                    <p className="text-slate-400 text-lg">
                        Full Stack Web Developer
                    </p>
                </div>

                {/* Introduction */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Hello, I'm Yash 👋
                    </h2>

                    <p className="text-slate-300 leading-7">
                        I'm a Full Stack Web Developer from Delhi, India.
                        I enjoy building modern, responsive and user-friendly
                        web applications and continuously improving my
                        development skills.
                    </p>

                    <p className="text-slate-300 leading-7 mt-4">
                        I started my journey with web development by learning
                        the fundamentals of HTML, CSS and JavaScript. Since
                        then, I have explored React, Next.js, Node.js,
                        Express, MongoDB and other technologies used to build
                        full-stack applications.
                    </p>
                </div>

                {/* Skills */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Technologies I Work With
                    </h2>

                    <div className="flex flex-wrap gap-3">
                        {[
                            "HTML",
                            "CSS",
                            "JavaScript",
                            "React",
                            "Next.js",
                            "Node.js",
                            "Express.js",
                            "MongoDB",
                            "Mongoose",
                            "Tailwind CSS",
                            "Git",
                            "GitHub"
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-4 py-2 bg-slate-800 rounded-lg text-slate-200"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Journey */}
                <div className="bg-slate-900 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        My Journey
                    </h2>

                    <p className="text-slate-300 leading-7">
                        I recently completed my BCA and am now focusing on
                        becoming industry-ready as a full-stack developer.
                        My current focus is on strengthening my JavaScript
                        fundamentals, practicing DSA, building real-world
                        projects and understanding how production
                        applications work.
                    </p>
                </div>

                {/* Goals */}
                <div className="bg-slate-900 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        What I'm Working On
                    </h2>

                    <ul className="space-y-3 text-slate-300">
                        <li>🚀 Building full-stack web applications</li>
                        <li>📚 Improving JavaScript and DSA skills</li>
                        <li>⚛️ Deepening my React and Next.js knowledge</li>
                        <li>🗄️ Learning more about databases and backend development</li>
                        <li>💼 Preparing for my first professional developer role</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default about

export const metadata = {
  title: 'About-GetMeDonation',
};