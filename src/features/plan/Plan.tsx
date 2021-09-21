import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { FC } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import PlanList from "../../components/PlanList";
import styles from "./Plan.module.css";
import {
  calculatePlan,
  selectPlan,
  setDob,
  setGender,
  setPaymentFrequency,
  setPlan,
  setPremiumPerYear,
  setSaPerYear,
} from "./planSlice";

const Plan: FC = () => {
  const {
    status,
    data,
    error,
    dob,
    gender,
    plan,
    paymentFrequency,
    premiumPerYear,
  } = useSelector(selectPlan);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (dob && gender && plan && paymentFrequency && premiumPerYear) {
      dispatch(calculatePlan()).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          document.getElementById("plan-section")?.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  return (
    <div className={styles.PlanPage}>
      <div className={styles.Hero}>
        <img
          src="/Privileges Landing Page.jpg"
          alt="landing"
          width="100%"
          className={styles.ImageLanding}
        />
        <div className={styles.HeroText}>ค้นหาแบบแผนที่ใช่สำหรับคุณ</div>
      </div>
      <div className={styles.FilterBox}>
        <Container maxWidth="lg">
          <Card elevation={0} className={styles.FilterCard}>
            <div className={styles.title}>คำนวนเบี้ยประกัน</div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-label" required>
                    เพศ
                  </InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender-select"
                    label="Gender"
                    required
                    defaultValue="MALE"
                    onChange={(el) => dispatch(setGender(el.target.value))}
                  >
                    <MenuItem value="MALE">ชาย</MenuItem>
                    <MenuItem value="FEMALE">หญิง</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="plan-label" required>
                    แผน
                  </InputLabel>
                  <Select
                    labelId="plan-label"
                    id="plan-select"
                    label="Plan"
                    defaultValue="T11A20"
                    onChange={(el) => dispatch(setPlan(el.target.value))}
                  >
                    <MenuItem value="T11A20">แผนที่ 1 วงเงิน 2 แสนบาท</MenuItem>
                    <MenuItem value="T11A50">แผนที่ 2 วงเงิน 5 แสนบาท</MenuItem>
                    <MenuItem value="T11AM1">
                      แผนที่ 3 วงเงิน 1 ล้านบาท
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="paymentFrequency-label">
                    งวดการชำระ
                  </InputLabel>
                  <Select
                    labelId="paymentFrequency-label"
                    id="paymentFrequency-select"
                    defaultValue="YEARLY"
                    label="งวดการชำระ"
                    onChange={(el) =>
                      dispatch(setPaymentFrequency(el.target.value))
                    }
                  >
                    <MenuItem value="YEARLY">รายปี</MenuItem>
                    <MenuItem value="HALFYEARLY">รายครึ่งปี</MenuItem>
                    <MenuItem value="QUARTERLY">ราย 3 เดือน</MenuItem>
                    <MenuItem value="MONTHLY">รายเดือน</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="วัน เดือน ปี เกิด"
                    value={dob}
                    onChange={(newValue) => {
                      if (newValue) {
                        const dateToString = format(newValue, "yyyy-MM-dd");
                        dispatch(setDob(dateToString));
                      }
                    }}
                    maxDate={new Date()}
                    inputFormat="dd/MM/yyyy"
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="เบี้ยประกัน"
                  required
                  fullWidth
                  placeholder="เช่น 50000"
                  type="number"
                  onChange={(el) =>
                    dispatch(setPremiumPerYear(+el.target.value))
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="ทุนประกันภัยที่ต้องการ"
                  fullWidth
                  type="number"
                  placeholder="เช่น 500000"
                  onChange={(el) => dispatch(setSaPerYear(+el.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  variant="contained"
                  disableElevation
                  onClick={handleSubmit}
                  fullWidth
                  size="large"
                  color="warning"
                  loading={status === "loading"}
                >
                  คำนวน
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </div>
      <PlanList error={error} data={data} />
    </div>
  );
};

export default Plan;
