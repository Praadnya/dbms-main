import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import Navbar from "./NavbarOrganization";
import apis from "../../api";
import DonorSides from "../../assets/DonorSides.jpg";



function isBoolean(value) {
  return typeof value === "boolean";
}

export default function ItemTimeline({ itemId }) {
  const [item, setItem] = useState(null);
  // Define the possible steps in your timeline
  const steps = ["Donated", "PickedUp", "Shipped", "Delivered"];
  useEffect(() => {
    apis
      .getOrgItemById(itemId)
      .then((response) => {
        setItem(response.data.results[0]);
      })
      .catch((error) => {
        console.error("Error fetching item details: ", error);
      });
  }, [itemId]);
  if (!item) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            marginTop: "20px",
            boxShadow: "0px 0px 15px 5px #508276",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            <strong>Loading...</strong>
          </Typography>
        </Paper>
      </Container>
    );
  }

  const currentStepIndex = steps.indexOf(item.Status);

  return (
    <div
      style={{
        backgroundColor: "#afe2c8",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container maxWidth="md">
        <Paper

          elevation={3}
          style={{
            padding: "5% 7% 5% 10%",
            marginTop: "7%",
            width:"130%",
            backgroundColor: "#daf7e8",
            boxShadow: "10px 10px 20px 5px #508276", // Add shadow
            marginLeft:"-15%"
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            <strong style={{ color: "#29423d", fontWeight:"bold", fontSize:"30px" }}>Donation Timeline</strong>
          </Typography>
          <div style={{ marginBottom: "20px" }}>
            <Typography variant="h6" style={{ color: "#29423d", marginTop:"4%", fontWeight:"bold" }}>
              Current Step: {item.Status}
            </Typography>
          </div>
          <Stepper
          style={{margin:"5% 0 0 0"}}
            activeStep={currentStepIndex}
            alternativeLabel
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#29423d", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "#508276", // Just text label (COMPLETED)
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#29423d", // circle color (ACTIVE)
              },
              "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                {
                  color: "#508276", // Just text label (ACTIVE)
                },
              "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                fill: "#ffff", // circle's number (ACTIVE)
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel style={{ color: "#fff" }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div style={{ marginTop: "20px" }}>
            <Typography style={{ marginTop:"5%"}} variant="h6" align="center" gutterBottom>
              <strong style={{ color: "#29423d" }}>Item Details</strong>
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", color: "#508276" }}
            >
              <strong style={{ color: "#3a5e56" }}>Name:</strong>{" "}
              {item.ItemName}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", color: "#508276" }}
            >
              <strong style={{ color: "#3a5e56" }}>Description:</strong>{" "}
              {item.ItemDesc}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", color: "#508276" }}
            >
              <strong style={{ color: "#3a5e56" }}>Quantity:</strong> {item.Qty}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", color: "#508276" }}
            >
              <strong style={{ color: "#3a5e56" }}>Expiration Date:</strong>{" "}
              {item.ExpDate}
            </Typography>
            <Typography
              variant="body1"
              style={{ fontSize: "1.2rem", color: "#508276" }}
            >
              <strong style={{ color: "#3a5e56" }}>Donor:</strong>{" "}
              {item.DonorName ? item.DonorName : "Anonymous"}
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}