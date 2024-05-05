"use client";
import "./account.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callFetchUser } from "@/apis/accountAPI";
import { useRouter } from "next/navigation";
import { InfoCircleOutlined, EditOutlined, DeleteOutlined ,UserAddOutlined, UserOutlined } from "@ant-design/icons";
const accountManagement = () => {
  const [accounts, setAcounts] = useState();
  const fetchClasses = async () => {
    try {
      // sort by first name
      let response = await callFetchUser();
      response.sort((a, b) => {
        if (a.firstName < b.firstName) {
          return -1;
        }
        if (a.firstName > b.firstName) {
          return 1;
        }
        return 0;
      }
      );
      setAcounts(response);
      // let response = await callFetchUser();
      // setAcounts(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  // search account
  const searchAccount = async() => {
    let search = document.querySelector(".form-control").value;
    if(search === ""){
      fetchClasses();
    }
    else{
      let result = accounts.filter((item) => {
        return item.username.toLowerCase().includes(search.toLowerCase());
      });
      setAcounts(result);
    }
  };

  // filter account
    const filterAccount = async (role) => {
      if(role.target.innerText === "Học Sinh"){
        let response = await callFetchUser();
        let result = response.filter((item) => {
          return item.role === "ROLE_STUDENT";
        });
        console.log(result);
        setAcounts(result);
      }
      else if(role.target.innerText === "Giáo viên"){
        let response = await callFetchUser();
        let result = response.filter((item) => {
          return item.role === "ROLE_TEACHER";
        });
        console.log(result);
        setAcounts(result);
      }
      else{
        fetchClasses();
      }
      
    }

  // delete account
  const deleteAccount = async (id) => {
    console.log(id);
    // try {
    //   let response = await callDeleteAccount(id);
    //   console.log(response);
    //   fetchClasses();
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };
  
  //router
  const router = useRouter();
  const changeRole = (role) => {
    switch (role) {
      case "ROLE_ADMIN":
        return "Admin";
        
      case "ROLE_TEACHER":
        return "Teacher";
        
      case "ROLE_STUDENT":
        return "Student";
        
      default:
        return "Unknown";
        
    }
  };
  return (
    <>
      <div className="page_sider">
        <ul>
          <li>
            <div>Quản lý tài khoản</div>
          </li>
          <li>
            <div>Quản lý blog</div>
          </li>
          <li>
            <div>
              Quản lý bài thi
            </div>
          </li>
        </ul>
      </div>
      <div className="page_display">
        <div className="card mb-3">
          <div className="card-header"> Tìm kiếm tài khoản</div>
          <div className="card-body">
            <div className="row">
              <div className="col-9">
                <input type="text" className="form-control" placeholder="Tìm kiếm bằng username" onChange={searchAccount} />
              </div>
              
            </div>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header">Quản lý tài khoản</div>
          <div className="card-body">
            <div className="row">
              <div className="col-10">
                <button className="btn btn-outline-secondary" onClick={filterAccount}> Tất cả </button>
                <button className="btn btn-outline-primary" onClick={filterAccount}> Học Sinh </button>
                <button className="btn btn-outline-info" onClick={filterAccount}> Giáo viên </button>
              </div>
            </div>
            <table className="table table-hover table-sm">
              <thead>
                <tr>
                  <th>STT</th>
             
                  <th>Tên đăng nhập</th>
                  <th>Họ và tên</th>
                  <th>Quyền</th>
                  <th>Email</th>
                  
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {accounts && accounts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      
                      <td>{item.username}</td>
                      <td>{item.lastName} {item.firstName}</td>
                      
                      <td>{
                        changeRole(item.role)
                      }
                      </td>
                      <td>{item.email != null ?item.email : "chưa xác thực "}</td>
                     
                      
                      <td>
                        
                        <button className="btn btn-warning btn-sm ml-1" onClick={() => {router.push(`account-management/detail/${item.id}`);}}><InfoCircleOutlined/></button>
                        <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteAccount(item.id)}><DeleteOutlined /></button  >
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};
export default accountManagement;