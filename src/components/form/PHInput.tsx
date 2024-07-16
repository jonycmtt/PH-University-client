import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder: string;
};

const PHInput = ({ type, placeholder, name, label }: TInputProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field }) => (
          <div style={{ marginBottom: "20px" }}>
            {label && <label htmlFor="id">{label} :</label>}
            <Input type={type} placeholder={placeholder} id={name} {...field} />
          </div>
        )}
      />
    </>
  );
};

export default PHInput;
