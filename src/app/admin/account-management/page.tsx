"use client";
import "./account.scss";
import "bootstrap/dist/css/bootstrap.css";
// import { removeDiacritics } from "diacritics";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { callFetchUser, callDeleteAccount } from "@/apis/accountAPI";
import { useRouter } from "next/navigation";
import { InfoCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const router = useRouter();

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      let response = await callFetchUser();
      response.sort((a, b) => a.firstName.localeCompare(b.firstName));
      setAccounts(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const searchAccount = async () => {
    let search = document.querySelector(".form-control").value;
    if (search === "") {
      fetchAccounts();
    } else {
      let result = accounts.filter((item) => item.username.toLowerCase().includes(search.toLowerCase()));
      setAccounts(result);
    }
  };


  const filterAccount = async (role) => {
    let response = await callFetchUser();
    if (role.target.innerText === "Học Sinh") {
      response = response.filter((item) => item.role === "ROLE_STUDENT");
    } else if (role.target.innerText === "Giáo viên") {
      response = response.filter((item) => item.role === "ROLE_TEACHER");
    }else{
      response = response.filter((item) => item.role === "ROLE_STUDENT" || item.role === "ROLE_TEACHER" || item.role === "ROLE_ADMIN");
    }
    setAccounts(response);
  };

  const deleteAccount = async (id) => {
    try {
      await callDeleteAccount(id);
      alert("Xóa tài khoản thành công");
      fetchAccounts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(accounts.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageButtons = pageNumbers.map((number, index) => {
      if (pageNumbers.length > 5) {
        if (currentPage === number || (currentPage < 3 && number <= 5) || (currentPage > pageNumbers.length - 2 && number >= pageNumbers.length - 4) || (number >= currentPage - 1 && number <= currentPage + 1)) {
          return (
            <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(number)}>{number}</button>
            </li>
          );
        } else if ((currentPage >= 3 && number === 2) || (currentPage <= pageNumbers.length - 2 && number === pageNumbers.length - 1)) {
          return (
            <li key={index} className="page-item disabled">
              <button className="page-link">...</button>
            </li>
          );
        }
      } else {
        return (
          <li key={index} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(number)}>{number}</button>
          </li>
        );
      }
    });

    return (
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
        </li>
        {renderPageButtons}
        <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    );
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Logic to calculate current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = accounts.slice(indexOfFirstItem, indexOfLastItem);

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
            <div>Quản lý bài thi</div>
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
                <button className="btn btn-outline-secondary" onClick={(e) => filterAccount(e)}> Tất cả </button>
                <button className="btn btn-outline-primary" onClick={(e) => filterAccount(e)}> Học Sinh </button>
                <button className="btn btn-outline-info" onClick={(e) => filterAccount(e)}> Giáo viên </button>
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
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.lastName} {item.firstName}</td>
                    <td>{changeRole(item.role)}</td>
                    <td>{item.email != null ? item.email : "chưa xác thực "}</td>
                    <td>
                      <button className="btn btn-warning btn-sm ml-1" onClick={() => router.push(`account-management/detail/${item.id}`)}><InfoCircleOutlined/></button>
                      <button className="btn btn-danger btn-sm ml-1" onClick={() => deleteAccount(item.id)}><DeleteOutlined/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            {renderPagination()}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountManagement;
