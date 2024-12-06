import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import CreateModal from "../component/modal/CreateModal";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useCRUD from "../hooks/useCRUD";
import FirebaseConnectionTest from "../component/protect";
import EditModal from "../component/modal/EditModal";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { items } = useSelector((state: RootState) => state.crud);
  const { handleDelete, setOpenModal, handleLogout, navigate } = useCRUD();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <Link to={"/admin"}>admin</Link>
      <Link to={"/user"}>user</Link>
      {/* <FirebaseConnectionTest /> */}
      <div className="flex flex-wrap justify-between">
        <CreateModal />
        <div className="flex">
          <h2 className="pr-2">{user?.email}</h2>

          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>Username</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Password</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>
              <span>Action</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {items.map((item) => (
              <TableRow
                key={item.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className=" font-medium text-gray-900 dark:text-white">
                  {item.username}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  {item ? <EditModal data={item} /> : "false"}

                  <Button onClick={() => handleDelete(item.id!)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
