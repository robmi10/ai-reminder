import React from 'react'
import { BouncerLoader } from '../animation/bouncer'

const Loading = () => {
    console.log("inside loading check")
    return (
        <div className="w-screen bg-stone-50 h-screen flex justify-center items-center">
            <BouncerLoader dark={true} />
        </div>
    )
}
export default Loading