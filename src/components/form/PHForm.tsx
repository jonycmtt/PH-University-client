import { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFromProps = {
  onSubmit: SubmitHandler<any>;
  children: ReactNode;
};

const PHForm = ({ onSubmit, children }: TFromProps) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>;
    </FormProvider>
  );
};

export default PHForm;
