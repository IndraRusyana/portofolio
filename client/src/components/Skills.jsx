import React from 'react';

const Skills = () => {
    // Data Skills
    const skills = [
        { name: "Bootstrap", icon: "fab fa-bootstrap", color: "text-primary" },
        { name: "JavaScript", icon: "fab fa-js", color: "text-warning" },
        { name: "React",      icon: "fab fa-react", color: "text-info" },
        { name: "Node.js",    icon: "fab fa-node",  color: "text-success" },
        { name: "Laravel",    icon: "fab fa-laravel", color: "text-danger" },
        { name: "MySQL",      icon: "fas fa-database", color: "text-secondary" },
        { name: "Git",        icon: "fab fa-git-alt", color: "text-danger" },
        { name: "Postman",    icon: "fas fa-paper-plane", color: "text-warning" },
    ];

    return (
        <section id="skills" className="py-5 bg-body-tertiary">
            <div className="container py-4">
                
                {/* Header Section */}
                <div className="text-center mb-5">
                    <h6 className="fw-bold text-uppercase ls-2" style={{color:'#6610f2'}}>My Tech Stack</h6>
                    <h2 className="fw-bold display-6">Tools & Technologies</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        Software dan framework yang saya gunakan sehari-hari untuk membangun aplikasi yang handal.
                    </p>
                </div>

                {/* Grid Skills */}
                <div className="row g-4 justify-content-center">
                    {skills.map((skill, index) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={index}>
                            <div className="skill-card p-3 rounded-4 shadow-sm text-center bg-body border h-100 d-flex flex-column justify-content-center align-items-center">
                                {/* Icon */}
                                <div className="mb-3">
                                    <i className={`${skill.icon} fa-3x ${skill.color}`}></i>
                                </div>
                                {/* Nama Skill */}
                                <h6 className="fw-bold mb-0">{skill.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;