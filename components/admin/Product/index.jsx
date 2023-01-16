import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import AlertDialog from "../../DialogPopup";
const Product = ({ data }) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/admin/product/${data._id}`);
      toast.success(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="border border-[#88888] p-1 m-1">
        <ToastContainer />
        {open && (
          <AlertDialog
            open={open}
            handleFunction={handleDelete}
            handleClose={handleCloseDialog}
          />
        )}
        <div className="flex sm:flex-col gap-2">
          <div className="flex item-center primary-bg justify-center">
            <img
              src={data.imageCover}
              alt="imageCover"
              className="aspect-square max-w-[150px] mix-blend-multiply"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <p className="font-sans text-sm line-clamp-1">{data.name}</p>
            <p
              className={`font-sans ${
                data.availableQuantity == 0 ? "secondary" : "text-green-600"
              } font-medium`}
            >
              {data.availableQuantity == 0
                ? "Out of stock!"
                : `${data.availableQuantity} stocks left`}
            </p>
            <div className="text-2xl flex gap-2 items-center">
              <p className="secondary p-1 rounded-full hover:secondary-bg cursor-pointer">
                <AiOutlineEye />
              </p>
              <p className="secondary p-1 rounded-full hover:secondary-bg cursor-pointer">
                <AiOutlineEdit />
              </p>
              <p
                onClick={handleOpenDialog}
                className="secondary p-1 rounded-full hover:secondary-bg cursor-pointer"
              >
                <AiOutlineDelete />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
