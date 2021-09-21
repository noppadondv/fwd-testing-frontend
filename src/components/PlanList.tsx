import { Card, CardContent, Container, Grid } from "@mui/material";
import { FC, memo } from "react";
import { Response } from "../types";
import styles from "./PlanList.module.css";

type RenderProp = {
  error: boolean;
  data: Response | null;
};

const PlanTable: FC<RenderProp> = ({ error, data }) => {
  if (error === true || (error === false && data === null)) {
    return null;
  }

  return (
    <div className={styles.PlanSection} id="plan-section">
      <Container className={styles.Container}>
        <div className={styles.PlanTitle}>แผนความคุ้มครอง</div>
        <Grid container spacing={2}>
          {data?.quotationProductList.map((row, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card className={styles.Card}>
                <CardContent>
                  <div className={styles.CardDetails}>
                    <div className={styles.CardDetailText}>วงเงินคุ้มครอง</div>
                    <div className={styles.CardDetailSum}>
                      {Number(row.baseSumAssured).toLocaleString()} บาท
                    </div>
                  </div>
                  <div className={styles.Payment}>
                    <div className={styles.PaymentText}>เบี้ยประกันรายปี</div>
                    <div className={styles.PaymentValue}>
                      {Number(row.baseAnnualPremium).toLocaleString()} บาท
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default memo(PlanTable);
