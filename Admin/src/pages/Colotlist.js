import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Color",
    dataIndex: "Color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      Color: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              backgroundColor: colorState[i].title,
              border: "2px solid #ddd",
            }}
          ></div>
          <span style={{ fontSize: "12px", color: "#666" }}>{colorState[i].title}</span>
        </div>
      ),
      action: (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link
            to={`/admin/color/${colorState[i]._id}`}
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
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiFillDelete /> Delete
          </button>
        </div>
      ),
    });
  }
  const deleteColor = (e) => {
    dispatch(deleteAColor(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };
  return (
    <div>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 className="title" style={{ fontSize: "28px", fontWeight: "600", margin: 0 }}>🎨 Colors</h3>
        <Link
          to="/admin/color"
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
          + Add Color
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
            <p style={{ fontSize: "16px" }}>No colors found</p>
          </div>
        )}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteColor(colorId);
        }}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default Colorlist;
