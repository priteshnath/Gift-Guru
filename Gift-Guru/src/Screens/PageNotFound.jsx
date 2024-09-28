import React from 'react'
import { useNavigate } from 'react-router-dom'


const PageNotFound = () => {
    const navigate = useNavigate();
    const handleBtnClick = () =>{
        navigate('/');
    }
    return (
        <>
            <div class="h-screen w-screen bg-gray-100 flex items-center">
                <div class="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
                    <div class="max-w-md">
                        <div class="text-5xl font-dark font-bold">404</div>
                        <p
                            class="text-2xl md:text-3xl font-light leading-normal"
                        >Sorry we couldn't find this page. </p>
                        <p class="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>

                        <button 
                            class="bg-btnColor text-white px-4 py-2 text-base rounded-md hover:bg-btnHover duration-300" 
                            onClick={handleBtnClick}
                        >
                                back to homepage
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound