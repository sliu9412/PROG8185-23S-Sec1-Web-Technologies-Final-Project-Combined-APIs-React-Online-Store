import React, { useEffect, useState } from "react";
import { getAPIs } from "../utils/Apis";
import IProduct from "../Interfaces/IProduct";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { AlertDialog } from "../utils/AlertDialog";
import { useNavigate } from "react-router-dom";

const productsList: IProduct[] = [];

function ProductsPage() {
  const alertDialog = new AlertDialog();
  const navigator = useNavigate();
  const [products, setProducts] = useState(productsList);

  const navigateToDetailPage = (productId: string | null) => {
    if (productId) {
      const url = `/detail/${productId}`;
      navigator(url);
    }
  };

  // load data from api
  useEffect(() => {
    fetch(getAPIs.allProducts, {
      method: "GET",
    }).then((res) => {
      if (res.status !== 200) {
        alertDialog.setTitle("Get Product Failed");
        alertDialog.setContent("Please try again later");
        alertDialog.openDialog();
      } else {
        res.json().then((res) => {
          setProducts(res.data as IProduct[]);
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {alertDialog.generateJSX()}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product._id} item xs={12} md={6} lg={4}>
              <div
                onClick={() => {
                  navigateToDetailPage(product?._id);
                }}
              >
                <Card
                  key={product?._id}
                  variant={"outlined"}
                  sx={{ position: "relative" }}
                >
                  <CardMedia
                    sx={{
                      height: "300px",
                    }}
                    image={product?.image}
                  />
                  <CardContent>
                    <Typography
                      variant={"h5"}
                      variantMapping={{ h5: "h2" }}
                      noWrap={true}
                    >
                      {product?.name}
                    </Typography>
                    <Typography variant={"h6"} variantMapping={{ h6: "h3" }}>
                      {product?.description}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default ProductsPage;
