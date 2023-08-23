import { Grid, Container } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface LoginRegisterSkeletonProps {
  children: ReactJSXElement;
}

function LoginRegisterSkeleton(props: LoginRegisterSkeletonProps) {
  const { children } = props;

  return (
    <div
      style={{
        position: "relative",
        minHeight: "90vh",
      }}
    >
      <Grid
        container
        display={{
          xs: "none",
          lg: "block",
        }}
        sx={{
          position: "absolute",
          zIndex: "-1",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            backgroundImage: "url('/assets/images/loginPageBG.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "90vh",
          }}
        />
        <Grid item xs={6} />
      </Grid>
      <Container>
        <Grid container>
          <Grid
            item
            lg={6}
            display={{
              xs: "none",
              lg: "block",
            }}
          ></Grid>
          <Grid
            display={"flex"}
            alignItems={"center"}
            item
            xs={12}
            lg={6}
            sx={{
              p: {
                xs: 3,
                lg: 5,
              },
              height: "80vh",
            }}
          >
            {children}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LoginRegisterSkeleton;
