import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelected from "../../../components/form/PHSelected";
import { nameOptions } from "../../../contants/semester";
import { monthOptions } from "../../../contants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { academicSemesterValidSchema } from "../../../Schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = nameOptions[Number(data.name - 1)].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Created Semester", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  const currentYear = new Date().getFullYear();

  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: (currentYear + number).toString(),
    label: (currentYear + number).toString(),
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterValidSchema)}
        >
          <PHSelected options={nameOptions} label="Name" name="name" />
          <PHSelected options={yearOptions} label="Year" name="year" />
          <PHSelected
            options={monthOptions}
            label="Start Month"
            name="startMonth"
          />
          <PHSelected
            options={monthOptions}
            label="End Month"
            name="endMonth"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
