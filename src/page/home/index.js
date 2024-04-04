import { Box, Center, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CustomerList } from "./CustomerList";
import { CustomerDetail } from "./CustomerDetail";

export const HomePage = () => {
  const [selected, setSelected] = useState();

  return (
    <Box h={"100%"}>
      <Flex>
        <CustomerList setSelected={setSelected} selected={selected} />
        {selected && <CustomerDetail data={selected} />}
      </Flex>
    </Box>
  );
};
