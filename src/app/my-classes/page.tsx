"use client";

import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateClassButton from "@/components/classButton/createClassButton";
import JoinClassButton from "@/components/classButton/joinClassButton";
import { callGetAllClass } from "@/apis/classAPI";
import { useEffect } from "react";
import { getAllClassAction } from "@/redux/slices/classSlice";
import { useRouter } from "next/navigation";
import paths from "@/app/paths";

const MyClasses = () => {
  const userRole = useSelector((state) => state.account.user.role);
  const dispatch = useDispatch();
  const router = useRouter();
  const allClass = async () => {
    const res = await callGetAllClass();
    // console.log(res);
    if (res.length) {
      dispatch(getAllClassAction(res));
    }
  };
  const handleUpdate = () => {
    allClass();
  };
  useEffect(() => {
    allClass();
    // console.log(">>>check classes list: ", classesList);
  }, [dispatch]);
  const classesList = useSelector((state) => state.classes.classesList);
  return (
    <>
      <Row className={"min-h-[78vh]"}>
        <Col
          md={4}
          className={"border-[1px] bg-gray-50 border-amber-500 px-5 py-3"}
        >
          {userRole === "ROLE_TEACHER" ? (
            <CreateClassButton onUpdate={handleUpdate} />
          ) : (
            <JoinClassButton onUpdate={handleUpdate} />
          )}
        </Col>
        <Col md={20}>
          {classesList.map((classItem) => {
            return (
              <div
                className={"border-[1px] px-10 py-5"}
                key={classItem.id}
                onClick={() =>
                  router.push(
                    `${paths.classroom}/${classItem.id}/notifications`,
                  )
                }
              >
                <p>{classItem.name}</p>
              </div>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default MyClasses;
