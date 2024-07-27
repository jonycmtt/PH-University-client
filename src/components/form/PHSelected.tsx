import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const PHSelected = ({ options, label, name }: TPHSelectProps) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select {...field} options={options} />
            {error && <small style={{ color: "#f00" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </>
  );
};

export default PHSelected;
