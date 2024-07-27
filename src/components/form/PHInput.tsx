import { Form, Input } from "antd";
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
          <Form.Item label={label}>
            <div>
              <Input
                type={type}
                placeholder={placeholder}
                id={name}
                {...field}
              />
            </div>
          </Form.Item>
        )}
      />
    </>
  );
};

export default PHInput;
