import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteABrand,
  getBrands,
  resetState,
} from "../features/brand/brandSlice";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Brandlist = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: i + 1,
      name: brandState[i].title,
      action: (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            to={`/admin/brand/${brandState[i]._id}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "#ffc107",
              color: "#333",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            <BiEdit /> Edit
          </Link>
          <button
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              background: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete /> Delete
          </button>
        </div>
      ),
    });
  }
  const deleteBrand = (e) => {
    dispatch(deleteABrand(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };
  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title" style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>🏷️ Brands</h3>
        <Link
          to="/admin/brand"
          style={{
            background: "#ffd333",
            color: "#333",
            padding: "10px 20px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          + Add Brand
        </Link>
      </div>
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0"
      }}>
        {data1.length > 0 ? (
          <Table
            columns={columns.map((col) => ({
              ...col,
              sorter: col.sorter ? col.sorter : undefined,
            }))}
            dataSource={data1}
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            <p style={{ fontSize: "16px", marginBottom: "20px" }}>No brands found</p>
            <Link
              to="/admin/brand"
              style={{
                background: "#ffd333",
                color: "#333",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                display: "inline-block"
              }}
            >
              + Add Your First Brand
            </Link>
          </div>
        )}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
