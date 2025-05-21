import React from 'react'

interface propsType {
    children : React.ReactNode;
}
export default function ContentContainer({children } : propsType) {
  return (
    <div>
              <div className="container ">
                  <div className="pt-20 lg:pt-0 lg:pr-20">
                  {children}
                  </div>
                </div>
    </div>
  )
}
