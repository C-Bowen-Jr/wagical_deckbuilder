import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// TODO: Maybe a limit prop. Basic Land or Relentless Rats have # field
export default function CardQuantitySelect() {
  return (
    <Box sx={{ minWidth: "3rem" }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          #
        </InputLabel>
        <NativeSelect
          defaultValue={1}
          inputProps={{
            name: 'quantity',
            id: 'uncontrolled-native',
          }}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
