import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemesterQuery(undefined);

  const tableSemesterData = semesterData?.data?.map(
    ({ _id, name, year, endMonth, startMonth }: TS) => ({
      _id,
      name,
      year,
      endMonth,
      startMonth,
    })
  );

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns: TableColumnsType<DataType> = [
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   showSorterTooltip: { target: "full-header" },
    //   filters: [
    //     {
    //       text: "Joe",
    //       value: "Joe",
    //     },
    //     {
    //       text: "Jim",
    //       value: "Jim",
    //     },
    //     {
    //       text: "Submenu",
    //       value: "Submenu",
    //       children: [
    //         {
    //           text: "Green",
    //           value: "Green",
    //         },
    //         {
    //           text: "Black",
    //           value: "Black",
    //         },
    //       ],
    //     },
    //   ],
    //   // specify the condition of filtering result
    //   // here is that finding the name started with `value`
    //   onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    //   sorter: (a, b) => a.name.length - b.name.length,
    //   sortDirections: ["descend"],
    // },
    {
      title: "Name",
      dataIndex: "name",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableSemesterData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
