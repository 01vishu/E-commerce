import React from "react";
import CouponTable from "../../../components/admin/coupon";
import Layout from "../../../components/admin/Layout";
import Coupon from "../../../model/Coupon";

const Coupons = ({ coupons }) => {
  return (
    <div>
      <Layout>
        <CouponTable coupons={coupons} />
      </Layout>
    </div>
  );
};
export async function getServerSideProps(context) {
  const coupons = await Coupon.find();

  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}

export default Coupons;
