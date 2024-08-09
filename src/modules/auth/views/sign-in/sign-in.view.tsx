import React from 'react'

import { LoginWidget } from '../../widgets/login'

type SignInViewProps = {
    // query parameters
    searchParams: { [key: string]: string | string[] | undefined }
    // url parameters
    params: { [key: string]: string | undefined }
}

export function SignInView(props: SignInViewProps) {
    return (
        <>
            <div className="text-white bg-whitecontainer relative sm:h-[1000px] overflow-y-hidden grid items-center sm:justify-center lg:max-w-none p-0">
                <div
                    className="absolute inset-0 bg-cover -z-10"
                    style={{
                        backgroundImage:
                            'url(https://live.staticflickr.com/2099/1535244043_b5121ef3ea_b.jpg)',
                    }}
                />
                <div className="bg-black border-2 bg-opacity-70 relative flex sm:-mt-96 sm:rounded-xl items-center justify-center px-4 lg:px-6 pt-4 pb-6">
                    <div className="absolute w-full h-full md:rounded-md p-2 -z-10" />
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold">Sign In</h1>
                            <p className="text-sm text-white">
                                Enter your username and password below to log
                                into your account
                            </p>
                        </div>
                        <LoginWidget />
                    </div>
                </div>
            </div>
        </>
    )
}
