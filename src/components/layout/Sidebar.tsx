import { Layout, Menu } from "antd";
import { SidebarGenerator } from "../../utils/sidebarGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";

const { Sider } = Layout;
const Sidebar = () => {
  const userRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };

  const role = userRole.FACULTY;
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = SidebarGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = SidebarGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = SidebarGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <div className="demo-logo-vertical">
        <h2 style={{ color: "white", padding: "10px", textAlign: "center" }}>
          PH University
        </h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
