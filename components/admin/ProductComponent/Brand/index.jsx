import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, FormControl, Input } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AlertDialog from "../../../DialogPopup";
export default function BrandTable({ brands }) {
  const [name, setName] = React.useState("");
  const handleAddBrand = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/product/brand`, { name });
      setName("");
      toast.success(data.message);
    } catch (error) {
      setName("");
      toast.error(error.message);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");
  const handleOnDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/product/brand?id=${id}`);
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
      <form className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Brand"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button
          className="py-2 px-4 font-semibold flex items-center w-fit primary-bg cursor-pointer hover:secondary-bg"
          onClick={handleAddBrand}
        >
          ADD
        </button>
      </form>
      {brands ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Brands</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brands.map((brand) => {
                return (
                  <TableRow key={brand._id}>
                    <TableCell>{brand.name}</TableCell>
                    <TableCell align="right">
                      <button
                        onClick={() => {
                          handleClickOpen(), setId(brand._id);
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
