import DateTimePicker from "react-datetime-picker";

export default function Calender({ value, onChange, ...rest }) {
  return (
    <DateTimePicker
      onChange={onChange}
      value={value}
      {...rest}
      disableClock
      excludeTimes
      format="dd/M/yyyy"
      clearIcon={false}
    />
  );
}
