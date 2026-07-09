'use client';

import React from 'react';

function MountainDivider({
  bg = 'hsl(218 55% 12%)',
  nextBg = 'hsl(210 30% 98%)'
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


const Heading = () => {

  return (
    <>
      <div>

        {/* Stats Section */}
        <div
          style={{
            background:
              'linear-gradient(135deg, hsl(218 55% 12%), hsl(218 50% 18%))'
          }}
        >

          <div className="max-w-5xl mx-auto">

            <div
              className="
              scroll-x 
              sm:grid 
              sm:grid-cols-4 
              gap-0 
              divide-x
              "
              style={{
                scrollSnapType:'none'
              }}
            >

              {[
                {
                  icon:'🔋',
                  num:'10K+',
                  label:'Battery Solutions'
                },
                {
                  icon:'⚡',
                  num:'99%',
                  label:'Power Efficiency'
                },
                {
                  icon:'🏭',
                  num:'500+',
                  label:'Industry Partners'
                },
                {
                  icon:'🌱',
                  num:'100%',
                  label:'Clean Energy'
                }

              ].map(({icon,num,label})=>(

                <div
                  key={label}
                  className="
                  proof-item 
                  flex-shrink-0 
                  min-w-[140px] 
                  sm:min-w-0
                  "
                  style={{
                    borderColor:
                    'hsl(218 30% 28%)'
                  }}
                >

                  <span className="text-xl">
                    {icon}
                  </span>


                  <div
                    className="proof-number"
                    style={{
                      color:
                      'hsl(145 70% 50%)'
                    }}
                  >
                    {num}
                  </div>


                  <div
                    className="text-xs"
                    style={{
                      color:
                      'hsl(210 25% 75%)'
                    }}
                  >
                    {label}
                  </div>


                </div>

              ))}


            </div>

          </div>

        </div>


        <MountainDivider
          bg="hsl(218 55% 12%)"
          nextBg="hsl(210 30% 98%)"
        />

      </div>
    </>
  )
}

export default Heading;