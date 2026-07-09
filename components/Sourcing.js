'use client';

function MountainDivider({
    bg = 'hsl(210 30% 98%)',
    nextBg = 'hsl(218 55% 12%)'
}) {
    return (
        <div style={{ background: bg, lineHeight: 0 }}>
            <svg
                viewBox="0 0 1440 60"
                preserveAspectRatio="none"
                style={{
                    width: '100%',
                    height: 50,
                    display: 'block',
                    fill: nextBg
                }}
            >
                <path d="M0,40 L120,20 L280,48 L420,10 L580,42 L740,5 L900,38 L1060,12 L1220,44 L1360,18 L1440,32 L1440,60 L0,60 Z" />
            </svg>
        </div>
    );
}


const Sourcing = () => {

    const solutions = [
        {
            region: 'EV Mobility',
            category: 'Electric Vehicles',
            products: [
                'E-Rickshaw Battery',
                'EV Battery Packs',
                'Lithium Solutions'
            ],
            desc:
                'High performance lithium battery solutions designed for electric mobility with longer life and reliable power output.',
            image:
                'https://arenq.co.in/wp-content/uploads/2025/06/11-2.jpeg',
            color: 'hsl(145 35% 22%)',
            icon: '🚗',
            quote:
                '"Driving the future of electric mobility with advanced energy technology."'
        },

        {
            region: 'Solar Energy',
            category: 'Renewable Power',
            products: [
                'Solar Battery',
                'Energy Storage',
                'Backup Systems'
            ],
            desc:
                'Smart solar energy storage solutions built for homes, businesses and renewable power applications.',
            image:
                'https://arenq.co.in/wp-content/uploads/2025/07/13634.jpg',
            color: 'hsl(12 55% 38%)',
            icon: '☀️',
            quote:
                '"Clean energy today creates a sustainable tomorrow."'
        },

        {
            region: 'Industrial Power',
            category: 'Business Solutions',
            products: [
                'UPS Battery',
                'Industrial Backup',
                'Custom Packs'
            ],
            desc:
                'Reliable industrial battery systems engineered for continuous performance and demanding applications.',
            image:
                'https://arenq.co.in/wp-content/uploads/2025/08/49266.jpg',
            color: 'hsl(28 65% 44%)',
            icon: '🏭',
            quote:
                '"Powering industries with safe and efficient energy storage."'
        },

        {
            region: 'Telecom & ESS',
            category: 'Energy Storage',
            products: [
                'Telecom Battery',
                'BESS',
                'Smart Storage'
            ],
            desc:
                'Advanced battery energy storage systems supporting telecom infrastructure and future energy needs.',
            image:
                'https://arenq.co.in/wp-content/uploads/2025/07/45509.jpg',
            color: 'hsl(200 70% 40%)',
            icon: '🔋',
            quote:
                '"Reliable energy whenever and wherever it is needed."'
        },
    ];


    return (
        <>

            <section
                className="py-14 sm:py-20"
                style={{
                    background:
                        'linear-gradient(180deg,hsl(210 30% 98%),hsl(200 40% 96%))'
                }}
            >

                <div className="max-w-7xl mx-auto px-4 sm:px-6">


                    <div className="text-center mb-12">

                        <p className="label-tag mb-2">
                            ARENQ Solutions
                        </p>


                        <h2
                            className="section-heading"
                            style={{
                                fontSize:
                                    'var(--text-xl)'
                            }}
                        >
                            Power Solutions For Every Industry
                        </h2>


                        <p
                            className="mt-3 text-sm max-w-xl mx-auto"
                            style={{
                                color:
                                    'hsl(30 12% 48%)'
                            }}
                        >
                            ARENQ delivers advanced lithium battery
                            solutions for electric vehicles, solar energy,
                            industries and modern energy storage applications.
                        </p>

                    </div>



                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

                        {solutions.map((item, i) => (

                            <div
                                key={i}
                                className="rounded-3xl overflow-hidden hover-lift"
                                style={{
                                    background: 'white',
                                    border:
                                        '1px solid hsl(35 15% 88%)'
                                }}
                            >

                                <div
                                    className="relative overflow-hidden"
                                    style={{
                                        height: '250px'
                                    }}
                                >

                                    <img
                                        src={item.image}
                                        alt={item.region}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />


                                    <div className="absolute bottom-3 left-3">

                                        <span className="text-lg">
                                            {item.icon}
                                        </span>

                                        <div
                                            className="text-xs font-bold mt-0.5"
                                            style={{
                                                color: 'white'
                                            }}
                                        >
                                            {item.region}
                                        </div>


                                        <div
                                            className="text-xs"
                                            style={{
                                                color:
                                                    'hsl(36 28% 80%)'
                                            }}
                                        >
                                            {item.category}
                                        </div>

                                    </div>

                                </div>


                                <div className="p-4">

                                    <div className="flex flex-wrap gap-1 mb-2">

                                        {item.products.map(p => (

                                            <span
                                                key={p}
                                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                style={{
                                                    background:
                                                        `${item.color}10`,
                                                    color:
                                                        item.color
                                                }}
                                            >
                                                {p}
                                            </span>

                                        ))}

                                    </div>


                                    <p
                                        className="text-xs leading-relaxed mb-3"
                                        style={{
                                            color:
                                                'hsl(30 12% 45%)'
                                        }}
                                    >
                                        {item.desc}
                                    </p>


                                    <div
                                        className="rounded-xl p-3"
                                        style={{
                                            background:
                                                'hsl(38 25% 95%)'
                                        }}
                                    >
                                        <p
                                            className="text-xs leading-relaxed"
                                            style={{
                                                color:
                                                    'hsl(30 12% 40%)',
                                                fontStyle:
                                                    'italic'
                                            }}
                                        >
                                            {item.quote}
                                        </p>
                                    </div>


                                </div>

                            </div>

                        ))}

                    </div>



                    {/* Stats */}

                    <div
                        className="rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center"
                        style={{
                            background:
                                'hsl(145 35% 22%)',
                            color:
                                'white'
                        }}
                    >

                        {[
                            ['150+', 'Domestic Clients'],
                            ['125+', 'Happy Customers'],
                            ['150+', 'Projects Completed'],
                            ['35000+', 'Products Delivered'],
                        ].map(([n, l]) => (

                            <div key={l}>

                                <div
                                    style={{
                                        fontFamily:
                                            'var(--font-display)',
                                        fontSize:
                                            'clamp(1.5rem, 3vw, 2.2rem)',
                                        fontWeight: 700,
                                        color:
                                            'hsl(28 65% 62%)'
                                    }}
                                >
                                    {n}
                                </div>

                                <div
                                    className="text-xs mt-0.5"
                                    style={{
                                        color:
                                            'hsl(145 20% 72%)'
                                    }}
                                >
                                    {l}
                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            <MountainDivider
                bg="hsl(38 25% 93%)"
                nextBg="hsl(36 28% 96%)"
            />

        </>
    )
}

export default Sourcing;