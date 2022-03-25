export default function TimePicker({ value, onChange, ...rest }) {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
}
