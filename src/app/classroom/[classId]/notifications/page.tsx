"use client";

import { UserOutlined } from "@ant-design/icons";
import {
  callCreateNotification,
  callGetClass,
  callGetNotification,
} from "@/apis/classAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentClassAction,
  getNotificationsAction,
} from "@/redux/slices/classSlice";
import { Avatar, Col, Divider, Row } from "antd";
import { FormatDate } from "@/utils/formatDate";
import { callReplyNotification } from "@/apis/commentsAPI";
import { colors } from "@/utils/constant";

type CommentInputs = {
  [key: number]: string;
};
type ShowComments = {
  [key: number]: boolean;
};

const ClassNotification = (props: any) => {
  const dispatch = useDispatch();
  // const classId = props.params.classId;
  // console.log("check params: ", props.params);
  const [classId, setClassId] = useState(props.params.classId);
  const [notification, setNotification] = useState("");
  const [comment, setComment] = useState<CommentInputs>({});
  const [showAllComments, setShowAllComments] = useState<ShowComments>({});
  const [isUpdate, setIsUpdate] = useState(true);
  const classInfo = useSelector(
    (state) => state.classes?.currentClass?.classInfo || {},
  );
  const notificationList = useSelector(
    (state) => state.classes?.currentClass?.notifications || null,
  );
  // console.log("check noti: ", notificationList);
  const user = useSelector((state) => state.account.user);
  // console.log(user);
  const userRole = user.role;
  const getClassDetail = async () => {
    setClassId(props.params.classId);
    const res = await callGetClass(classId);
    // console.log(">>>check res: ", res);
    if (res) {
      dispatch(getCurrentClassAction(res));
      const notificationList = await callGetNotification(classId);
      // console.log("check noti list: ", notificationList);
      notificationList.sort((a: object, b: object) => {
        return new Date(b.postTime) - new Date(a.postTime);
      });
      dispatch(getNotificationsAction(notificationList));
      setIsUpdate(false);
    }
  };
  useEffect(() => {
    getClassDetail();
  }, [isUpdate]);

  const handleInputChange = (e) => {
    const message = e.target.value;
    setNotification(message);
    // console.log("check state: ", notification);
  };

  const handleChangeComment = (e, notificationId: number) => {
    const message = e.target.value;
    setComment((prevInputs) => ({
      ...prevInputs,
      [notificationId]: message,
    }));
  };

  const handleEnter = async () => {
    const res = await callCreateNotification(classId, notification);
    setIsUpdate(true);
    setNotification("");
  };

  const handleEnterReply = async (notificationId: number) => {
    const content = comment[notificationId];
    if (content.trim() !== "") {
      const res = await callReplyNotification(notificationId, content);
      setIsUpdate(true);
      setComment((prevInputs) => ({
        ...prevInputs,
        [notificationId]: "",
      }));
    }
  };

  return (
    <>
      <div className={"w-3/5 mx-auto"}>
        {/*<div*/}
        {/*  className={*/}
        {/*    "bg-gradient-to-r from-red-500 w-full h-56 flex items-end p-5 my-5 rounded-xl"*/}
        {/*  }*/}
        {/*>*/}
        {/*  <p className={"text-3xl font-bold text-white"}>Notifications</p>*/}
        {/*</div>*/}
        <Row>
          <Col className={"h-28 place-items-start pr-5"} span={5}>
            <div className={"border-[1px] h-full pt-2 pl-4 rounded-xl"}>
              <p className={"text-lg font-semibold mb-6"}>Class code</p>
              <p className={"text-2xl font-bold text-rose-500"}>
                {classInfo.code}
              </p>
            </div>
          </Col>
          <Col span={19}>
            <input
              type={"text"}
              placeholder={"Announce something to your class"}
              value={notification}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleEnter()}
              className={"border-[1px] w-full rounded-xl px-5 py-3"}
            />
            {notificationList.map((notification) => (
              <>
                <div
                  key={notification.id}
                  className={`mt-5 rounded-xl w-full py-3 bg-[${colors.blue_6}]`}
                  style={{ backgroundColor: `${colors.blue_6}` }}
                >
                  <div className="px-5">
                    <Row>
                      <Avatar
                        size={48}
                        icon={<UserOutlined />}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${notification.authorAvatarId}`}
                        className="mr-3"
                      />
                      <Col>
                        <Row>
                          <p
                            className={"font-semibold text-lg mr-1"}
                            style={{ color: `${colors.blue_5}` }}
                          >
                            {classInfo.teacherLastName +
                              " " +
                              classInfo.teacherFirstName}
                          </p>
                          <p
                            className={"relative top-[5px]"}
                            style={{ color: `${colors.blue_5}` }}
                          >
                            {" "}
                            đã đăng một thông báo
                          </p>
                        </Row>

                        <p className={"text-gray-500"}>
                          {FormatDate(notification.postTime)}
                        </p>
                      </Col>
                    </Row>
                    <div
                      dangerouslySetInnerHTML={{ __html: notification.content }}
                    />
                    {/*<p className={"mt-5"}>{notification.content}</p>*/}
                  </div>
                  <Divider className="w-full mt-3" />
                  <div className="px-5">
                    {notification.lastComment?.id ? (
                      <>
                        <div className="mx-3">
                          <Row>
                            <Avatar
                              size={42}
                              icon={<UserOutlined />}
                              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${notification.lastComment.userAvatarId}`}
                              className="mr-2.5"
                            />
                            <Col>
                              <p className="font-semibold text-base text-gray-800">
                                {notification.lastComment.userLastName +
                                  " " +
                                  notification.lastComment.userFirstName}
                              </p>
                              <p className="text-gray-500">
                                {FormatDate(notification.lastComment.postTime)}
                              </p>
                            </Col>
                          </Row>
                          <p className={"mt-3"}>
                            {notification.lastComment.content}
                          </p>
                        </div>
                      </>
                    ) : null}
                    <input
                      placeholder="Add comment"
                      type="text"
                      value={comment[notification.id]}
                      onChange={(e) => handleChangeComment(e, notification.id)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleEnterReply(notification.id)
                      }
                      className={
                        "border-[1px] w-full rounded-3xl px-5 py-3 mt-3"
                      }
                    />
                  </div>
                </div>
              </>
            ))}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassNotification;
