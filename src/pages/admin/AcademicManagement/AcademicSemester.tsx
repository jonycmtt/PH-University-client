import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAcademicSemesterQuery(undefined);
  if (isLoading) {
    return <p>loading...</p>;
  }
  console.log(data);
  return (
    <div>
      <h2>This is AcademicSemester component</h2>
    </div>
  );
};

export default AcademicSemester;
