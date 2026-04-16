import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteACoupon,
  getAllCoupon,
  resetState,
} from "../features/coupon/couponSlice";
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
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupon());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);
  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      discount: `${couponState[i].discount}%`,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            to={`/admin/coupon/${couponState[i]._id}`}
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
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete /> Delete
          </button>
        </div>
      ),
    });
  }
  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getAllCoupon());
    }, 100);
  };
  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title" style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>🎟️ Coupons</h3>
        <Link
          to="/admin/coupon"
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
          + Add Coupon
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
            columns={columns}
            dataSource={data1}
            pagination={{ pageSize: 10 }}
            bordered={false}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            <p style={{ fontSize: "16px" }}>No coupons found</p>
          </div>
        )}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCoupon(couponId);
        }}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
