/* eslint-disable @next/next/no-img-element */
import { AiFillHome } from "react-icons/ai";
import { IoMdContact } from "react-icons/io";
import { MdCall } from "react-icons/md";
const ShippingAddress = ({ user }) => {
  return (
    <>
      {user.address && (
        <div className="border-2 font-medium flex gap-4 p-4 w-fit mx-auto border-[#f4f4f4]">
          <div className="flex justify-center text-sm flex-wrap gap-8">
            <img
              src={user.image}
              width={100}
              height={100}
              alt={user.name}
              className="rounded-full"
            />
            <div className="flex  gap-2">
              <AiFillHome size={20} className={"text-primary"} />
              <div className="flex flex-col gap-1">
                <p>
                  {user.address.address1}
                  {user.address.address2 && ", "}
                  {user.address?.address2}
                </p>
                <p>{user.address.city}</p>
                <p>
                  {user.address.state} {user.address.pinCode}
                </p>
                <div className="flex gap-2">
                  <p>{user.address.country}</p>
                  {/* <HiLocationMarker size={20} className={"text-primary"} /> */}
                </div>
              </div>
            </div>
            <div className="flex-col flex gap-1">
              <div className="flex items-start gap-2">
                <IoMdContact size={20} className={"text-primary"} />
                <p>
                  {user.address.firstName} {user.address.lastName}
                </p>
              </div>
              <div className="flex items-start  gap-2">
                <MdCall size={20} className={"text-primary"} />
                <p>{user.address.phoneNumber}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingAddress;
