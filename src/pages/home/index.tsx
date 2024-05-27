import { useState } from "react";
import { Container } from "@containers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { date } from "../../service/date";
import { Button } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface Data {
  all_orders: any;
  done: any;
  in_progress: any;
}

const Index = () => {
  const defaultDate = dayjs().startOf("month").date(1);
  const [date1, setDate1] = useState(defaultDate);
  const [date2, setDate2] = useState(defaultDate);
  const [data, setData] = useState<Data>({
    all_orders: 0,
    done: 0,
    in_progress: 0,
  });

  console.log(data);

  const firstDayOfMonth = dayjs().startOf('month');
  const lastDayOfMonth = dayjs().endOf('month');

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
      setData(res.data);
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
                defaultValue={firstDayOfMonth}
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
          <div className="flex mt-5">
            {data && (
              <PieChart
                series={[
                  {
                    data: [
                      { value: data.all_orders, label: "all_orders" },
                      { value: data.done, label: "done" },
                      { value: data.in_progress, label: "in_progress" },
                    ],
                  },
                ]}
                width={600}
                height={400}
              />
            )}
          </div>
        </LocalizationProvider>
      </Container>
    </div>
  );
};

export default Index;
