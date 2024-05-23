import { useState } from "react";
import "./style.scss";
import { Container } from "@containers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { date } from "../../service/date";
import { Button } from "@mui/material";

const Index = () => {
  const [date1, setDate1] = useState(dayjs());
  const [date2, setDate2] = useState(dayjs());

  const handleDate1Change = (newValue: any) => {
    const formattedDate = newValue.format("YYYY-MM-DD");
    setDate1(newValue);
    console.log("Date 1:", formattedDate);
  };

  const handleDate2Change = (newValue: any) => {
    const formattedDate = newValue.format("YYYY-MM-DD");
    setDate2(newValue);
    console.log("Date 2:", formattedDate);
  };

  const getDate = async () => {
    if (date1 && date2) {
      const dateValue = {
        start: date1.format("YYYY-MM-DD"),
        end: date2.format("YYYY-MM-DD"),
      };
      const res = await date.dateGet(dateValue);
      console.log(res);
    } else {
      console.log("Please select both dates.");
    }
  };

  return (
    <div>
      <Container>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField", "DateField"]}>
            <div className="flex items-center gap-4">
              <DatePicker
                label="From"
                format="YYYY-MM-DD"
                value={date1}
                onChange={handleDate1Change}
              />
              <DatePicker
                label="To"
                format="YYYY-MM-DD"
                value={date2}
                onChange={handleDate2Change}
              />
              <Button onClick={getDate}>Get Data</Button>
            </div>
          </DemoContainer>
        </LocalizationProvider>
      </Container>
    </div>
  );
};

export default Index;
