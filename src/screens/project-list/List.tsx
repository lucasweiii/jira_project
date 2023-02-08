import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { User } from "./SearchPanel";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  resList: Project[];
  users: User[];
}
const List = ({ resList, users }: ListProps) => {
  return (
    <TableContainer sx={{ width: 320, mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Pricipal</TableCell>
          </TableRow>
          <TableBody>
            {resList.map((item) => (
              <TableRow key={item.id}>
                {/* {console.log(item)} */}
                <TableCell>{item.name}</TableCell>
                {/* 后端返回的用户名是personId,所以需要拿着personId去获取name */}
                {/* ?. 表示当 ?. 前面的表达式为undefined时,该这个表达式的值返回undefined而不报错 */}
                <TableCell>
                  {users.find((users) => users.id === item.personId)?.name ||
                    "Unknow"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHead>
      </Table>
    </TableContainer>
  );
};
export default List;
