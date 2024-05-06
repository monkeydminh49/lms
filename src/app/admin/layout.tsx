"use client";

import { useRouter } from "next/navigation";
import paths from "@/app/paths";
import Link from "next/link";
import { TiDocumentAdd } from "react-icons/ti";
import  {IoCreateOutline, IoDocumentTextOutline} from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { ReactNode, useEffect } from "react";
import { useParams } from "next/navigation";
import { callGetClass } from "@/apis/classAPI";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentClassAction } from "@/redux/slices/classSlice";
import { FaChalkboardTeacher, FaHistory } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import {
  MdAssignmentTurnedIn,
  MdChecklistRtl,
  MdOutlineWork,
} from "react-icons/md";
import { FaPeopleLine } from "react-icons/fa6";
import { ROLE_ADMIN, ROLE_TEACHER } from "@/utils/constant";
import { Tooltip } from "antd";
import { PiListChecks } from "react-icons/pi";

const AdminPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div className={"flex flex-col"}>
      <div className={"h-14"}></div>
      <div className={"flex flex-col min-h-[59vh]"}>
        {/* <button  
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/${paths.uploadDocument}`)}
        >
          Đăng ngữ liệu
        </button>
        <button
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/document`)}
        >
          Quản lý ngữ liệu
        </button>
        <button
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/${paths.createTest}`)}
        >
          Tạo bài tập ngữ liệu
        </button> */}
        <div className={"flex items-center mt-5 pl-10 mb-5"}>
          <div className="flex items-center">
            <FaChalkboardTeacher className={"h-10 w-10 mr-4"} />
            <p className={"text-xl font-bold"}>Xin chào ADMIN</p>
          </div>

          <div className="flex w-1/2 ml-[5vw] ">
            <Tooltip
              className={
                "flex justify-center px-[2vw]  hover:bg-slate-200 cursor-pointer py-1 "
              }
              placement="top"
              title={"Tạo bài kiểm tra"}
              color={"#367ff0"}
              arrow={false}
            >
              <Link
                href={`${paths.admin}/${paths.createTest}`}
              >
                <IoCreateOutline className={"h-6 w-6"} />
              </Link>
            </Tooltip>
            <Tooltip
              className={
                "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
              }
              placement="top"
              title={"Quản lý ngữ liệu"}
              color={"#367ff0"}
              arrow={false}
            >
              <Link
                href={`${paths.admin}/document`}
              >
                {/*Assignments*/}
                <IoDocumentTextOutline className={"h-6 w-6"} />
              </Link>
            </Tooltip>
            <Tooltip
              className={
                "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
              }
              placement="top"
              title={"Đăng ngữ liệu mới"}
              color={"#367ff0"}
              arrow={false}
            >
              <Link
                href={`${paths.admin}/${paths.uploadDocument}`}
              >
                {/*Members*/}
                <TiDocumentAdd className={"h-6 w-6"} />
              </Link>
            </Tooltip>
            <Tooltip
              className={
                "flex justify-center px-[2vw] border-black border-l-[1px] hover:bg-slate-200 cursor-pointer py-1"
              }
              placement="top"
              title={"Quản lý tài khoản"}
              color={"#367ff0"}
              arrow={false}
            >
              <Link
                href={`${paths.admin}/account-management`}
              >
                {/*Assignments*/}
                <FaRegUser className={"h-6 w-6"} />
              </Link>
            </Tooltip>

          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminPage;
