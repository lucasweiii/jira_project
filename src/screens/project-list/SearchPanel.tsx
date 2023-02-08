import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface SearchPanelProps {
  users: User[];
  formValue: {
    name: string; //搜索框输入的项目名
    personId: string; //下拉选择框的id(搜索发送请求用)
  };
  setFormValue: (param: SearchPanelProps["formValue"]) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
}

const SearechPanel = ({ formValue, setFormValue, users }: SearchPanelProps) => {
  return (
    <Box>
      <Box component={"form"} sx={{ minWidth: 120, mt: 2 }}>
        <TextField
          value={formValue.name}
          variant="standard"
          label="Project Name"
          onChange={(e) =>
            setFormValue({ ...formValue, name: e.currentTarget.value })
          }
        />
        <FormControl sx={{ minWidth: 120, ml: 2 }}>
          <InputLabel>Pricipal</InputLabel>
          <Select
            value={formValue.personId}
            onChange={(e) =>
              setFormValue({ ...formValue, personId: e.target.value })
            }
          >
            <MenuItem value="" key="">
              负责人
            </MenuItem>
            {users.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
export default SearechPanel;
