'use client';
import React from 'react';
import { fetchAccount } from '@/apis/accountAPI';
import UserInfo from "@/components/userInfo";
import { ROLE_STUDENT } from "@/utils/constant";

import { useEffect, useRef, useState, useSelector } from "react";

const AccountDetailPage =  ({ params }) => {
    const id = params.accountId;
    const [user, setUser] = useState({});
    const fetchUser = async () => {
        try {
            let response = await fetchAccount(id);
            setUser(response);
            console.log(response);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    
    return (
        <div className={"block mx-auto w-[90%]"}>
            {/* <h3 className={"font-bold text-2xl text-blue_8"}>THÔNG TIN CÁ NHÂN</h3> */}
            <div className={"bg-blue_8 h-[1px] my-3 w-[70%]"} />
                <div className={"col-span-9 h-full"}>
                    <div className={"grid grid-cols-5 profile-user h-full"}>
                        <div
                            className={
                                "col-span-9 user-info h-full bg-blue_6 rounded-l rounded-tr px-5"
                            }
                        >
                            <h2 className={"text-blue_8 font-bold text-2xl mt-5"}>
                                Thông tin tài khoản {user.lastName + " " + user.firstName}
                            </h2>
                            <div className={"bg-blue_8 h-[1px] my-3"} />
                            <div className={"flex justify-center"}>
                                <img
                                        src= {`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`}
                                        alt={user.lastName + " " + user.firstName}
                                        className={"rounded-full"}
                                        width={150}
                                        height={150}
                                    /> 
                            </div>
                            <div className={"pl-5"}>
                                <UserInfo
                                    label={"Họ và tên: "}
                                    value={user.lastName + " " + user.firstName}
                                />
                                <UserInfo label={"Email: "} value={user.email} />
                                <UserInfo label={"Tên tài khoản: "} value={user.username} />
                                <UserInfo
                                    label={"Ngày sinh: "}
                                    value={user.dateOfBirth}
                                />
                                <UserInfo label={"Giới tính: "} value={user.gender} />
                                <UserInfo
                                    label={"Vai trò: "}
                                    value={user.role === ROLE_STUDENT ? "Student" : "Teacher"}
                                />
                            </div>
                            <div className={"rounded-r bg-blue_6"} />
                                   
                        </div>
                        
                    </div>
                </div>
            </div>
    );
};
export default AccountDetailPage;