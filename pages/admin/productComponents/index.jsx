import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Layout from "../../../components/admin/Layout";
import BrandTable from "../../../components/admin/ProductComponent/Brand";
import FlavourTable from "../../../components/admin/ProductComponent/Flavour";
import Brand from "../../../model/Brand";
import Flavour from "../../../model/Flavour";
import WeightTable from "../../../components/admin/ProductComponent/Weight";
import Weight from "../../../model/Weight";
import ProductTitle from "../../../model/ProductTitle";
import ProductTilte from "../../../components/admin/ProductComponent/ProductTitle";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductComponects({
  brands,
  flavours,
  weights,
  productTitle,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontWeight: 600, color: "#88888" }}
              label="Brand"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontWeight: 600, color: "#88888" }}
              label="Flavour"
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontWeight: 600, color: "#88888" }}
              label="Weight"
              {...a11yProps(2)}
            />
            <Tab
              sx={{ fontWeight: 600, color: "#88888" }}
              label="Product Title"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BrandTable brands={brands} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FlavourTable flavours={flavours} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <WeightTable weights={weights} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ProductTilte productTitle={productTitle} />
        </TabPanel>
      </Box>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const brands = await Brand.find();
  const flavours = await Flavour.find();
  const weights = await Weight.find();
  const productTitle = await ProductTitle.find();

  return {
    props: {
      brands: JSON.parse(JSON.stringify(brands)),
      flavours: JSON.parse(JSON.stringify(flavours)),
      weights: JSON.parse(JSON.stringify(weights)),
      productTitle: JSON.parse(JSON.stringify(productTitle)),
    },
  };
}
