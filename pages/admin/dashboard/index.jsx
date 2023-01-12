import Card from "../../../components/admin/Dashboard/Card";
import Layout from "../../../components/admin/Layout";
const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
