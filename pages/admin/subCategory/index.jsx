import React from "react";
import Layout from "../../../components/admin/Layout";
import SubCategoryTable from "../../../components/admin/subCategory";
import SubCategory from "../../../model/SubCategory";
const SubCategories = ({ subCategories }) => {
  return (
    <div>
      <Layout>
        <SubCategoryTable subCategories={subCategories} />
      </Layout>
    </div>
  );
};
export async function getServerSideProps(context) {
  const subCategories = await SubCategory.find();

  return {
    props: {
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    },
  };
}
export default SubCategories;
