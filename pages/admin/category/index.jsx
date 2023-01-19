import React from "react";
import CategoryTable from "../../../components/admin/category";
import Layout from "../../../components/admin/Layout";
import Category from "../../../model/Category";

const Categories = ({ categories }) => {
  return (
    <div>
      <Layout>
        <CategoryTable categories={categories} />
      </Layout>
    </div>
  );
};
export async function getServerSideProps(context) {
  const categories = await Category.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}

export default Categories;
