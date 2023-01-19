import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Input, Stack, TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../DialogPopup";
export default function CouponTable({ coupons }) {
  const [name, setName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const fixEndDate = endDate.split("-");
  const fixStartDate = startDate.split("-");
  const fixedEndDate = `${fixEndDate[2]}-${fixEndDate[1]}-${fixEndDate[0]}`;
  const fixedStartDate = `${fixStartDate[2]}-${fixStartDate[1]}-${fixStartDate[0]}`;
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/product/coupon`, {
        coupon: name,
        startDate: fixedStartDate,
        endDate: fixedEndDate,
        discount,
      });
      setName("");
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      setName("");
      toast.error(error.message);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleOnDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/product/coupon?id=${id}`);
      toast.success(data.message);
      setOpen(false);
      window.location.href;
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer />
      <form className="flex flex-wrap items-center gap-4">
        <TextField
          id="coupon"
          type="text"
          label="Coupon"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <TextField
          id="discount"
          type="number"
          label="Discount"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
        />

        <TextField
          id="startDate"
          label="Start Date"
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
        <TextField
          id="endDate"
          label="End Date"
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />

        <button
          className="py-2 px-4 font-semibold flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          onClick={handleAddCoupon}
        >
          ADD
        </button>
      </form>
      {coupons ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Coupons</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Start Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>End Date</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon) => {
                return (
                  <TableRow key={coupon._id}>
                    <TableCell>{coupon.coupon}</TableCell>
                    <TableCell>{coupon.startDate}</TableCell>
                    <TableCell>{coupon.endDate}</TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => {
                          handleClickOpen(), setId(coupon._id);
                        }}
                        className="py-2 px-4 font-semibold w-fit primary-bg cursor-pointer hover:secondary-bg"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
      <AlertDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleFunction={handleOnDelete}
      />
      ;
    </div>
  );
}
